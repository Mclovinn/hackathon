import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { DataGrid, GridColDef, GridToolbar, GridSelectionModel, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, IconButton } from '@mui/material'
import styled from 'styled-components'
import { Dropdown } from '../common/dropdown.component'
import { useQuery } from 'react-query'
import { getOrders } from '../../services/frontend-services/orders'
import { OrderStatus } from '../../types/order-status'
import { SuccessAlert } from '../common/alert/success-alert'
import { initializeOrders, setOrderAsDelivered } from '../../services/frontend-services/orders'
import BounceLoader from 'react-spinners/BounceLoader'
import { ErrorAlert } from '../common/alert/error-alert'
import { OrderType } from '../../types/order.type'
import { getOrderAddress } from '../../services/frontend-services/google-maps'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import jsPDF from 'jspdf'
import { QRCodeCanvas } from 'qrcode.react'

const $GridContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.colors.nero};
  height: fit-content;
  width: 1200px;
  height: auto;
  margin: 20px auto;
  border-radius: 12px;
`

const $GridHeader = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 15px;
  margin-top: 60px;
`

const $LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const $SectionCode = styled.div`
  display: none;
`

export type TableRowType = {
  id: string
  sku: string
  status: OrderStatus
  address: string
  tracking: string
}

const generatePDF = (orderId: string) => {
  const pdf = new jsPDF({
    unit: 'cm',
    format: [10, 15],
  })
  const canvas = document.getElementById(`qrcode-${orderId}`) as HTMLCanvasElement
  const base64Image = canvas.toDataURL()

  pdf.addImage(base64Image, 'svg', 2.5, 3, 5, 5)
  pdf.setFontSize(10)
  pdf.text(orderId, 5, 8.5, { align: 'center' })
  pdf.output('dataurlnewwindow', { filename: `QR-${orderId}.pdf` })
}

export function Orders() {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>()
  const [selectedRows, setSelectedRows] = useState<TableRowType[]>([])
  const [orderIdForQrCode, setOrderIdForQrCode] = useState<string>('')
  const { data: orders, refetch } = useQuery('get-orders', getOrders)
  const [parsedOrders, setParsedOrders] = useState<TableRowType[]>([])
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const initializeOrdersMutation = useMutation(initializeOrders, {
    onSuccess: data => {
      setTransactionHash(data.txHash)
      refetch()
    },
    onError: error => {
      error && setError(true)
    },
  })
  const setOrderAsDeliveredMutation = useMutation(setOrderAsDelivered, {
    onSuccess: data => {
      setTransactionHash(data.txHash)
      refetch()
    },
    onError: error => {
      error && setError(true)
    },
  })

  const columns: GridColDef[] = [
    { headerClassName: 'super-app-theme--header', field: 'id', headerName: 'Order ID', width: 300 },
    { headerClassName: 'super-app-theme--header', field: 'sku', headerName: 'SKU', width: 100 },
    { headerClassName: 'super-app-theme--header', field: 'status', headerName: 'Status', width: 120 },
    { headerClassName: 'super-app-theme--header', field: 'address', headerName: 'Destination Address', width: 150 },
    { headerClassName: 'super-app-theme--header', field: 'tracking', headerName: 'Tracking ID', width: 300 },
    {
      headerClassName: 'super-app-theme--header',
      field: 'document',
      headerName: 'Shipping Document',
      width: 150,
      align: 'center',
      renderCell: (params: GridRenderCellParams<any, TableRowType>) =>
        params.row.status !== OrderStatus.READY_TO_FULFILL && (
          <>
            <IconButton aria-label="pdf-document" onClick={() => setOrderIdForQrCode(params.row.id)} size="medium">
              <PictureAsPdfOutlinedIcon fontSize="large" />
            </IconButton>
          </>
        ),
    },
  ]

  useEffect(() => {
    if (!orders) return
    setOrders(orders)
  }, [orders])

  useEffect(() => {
    if (!orderIdForQrCode) return
    generatePDF(orderIdForQrCode)
    setOrderIdForQrCode('')
  }, [orderIdForQrCode])

  const setOrders = async (orders: OrderType[]) => {
    let newParsedOrders: TableRowType[] = []
    for (const order of orders) {
      const address = await getOrderAddress(order.destinationAddress.latitude, order.destinationAddress.longitude)
      newParsedOrders.push({
        id: order.id,
        sku: order.sku,
        status: order.status,
        address: address,
        tracking: order.trackingId,
      })
    }
    setParsedOrders(newParsedOrders)
  }

  const setOrderAsDeliveredAction = async () => {
    for (let row of selectedRows) {
      setOrderAsDeliveredMutation.mutate(row.id)
    }
  }

  const onInitializeSubmit = async () => {
    initializeOrdersMutation.mutate(selectedRows.map(order => order.id))
  }

  return (
    <>
      {transactionHash !== '' && transactionHash !== undefined ? <SuccessAlert txHash={transactionHash} /> : null}
      {error ? <ErrorAlert /> : null}
      <$GridContainer>
        <$GridHeader>
          <Dropdown onDeliveredSubmit={setOrderAsDeliveredAction} onInitializeSubmit={onInitializeSubmit} />
        </$GridHeader>
        <Box
          sx={{
            height: 600,
            padding: '0 20px',
            '& .super-app-theme--header': {
              fontSize: '20px',
            },
          }}
        >
          <DataGrid
            disableDensitySelector
            disableColumnSelector
            disableColumnMenu={true}
            sx={{
              border: 'none',
              width: '100%',
            }}
            rows={parsedOrders}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={e => {
              setSelectionModel(e)
              const selectedIDs = new Set(e)
              const selected = parsedOrders.filter(r => selectedIDs.has(r.id))
              setSelectedRows(selected)
            }}
          />
        </Box>
        {initializeOrdersMutation.isLoading && (
          <$LoaderWrapper>
            <BounceLoader color="#7A27E8" />
          </$LoaderWrapper>
        )}
        {setOrderAsDeliveredMutation.isLoading && (
          <$LoaderWrapper>
            <BounceLoader color="#7A27E8" />
          </$LoaderWrapper>
        )}
      </$GridContainer>
      <$SectionCode>
        {typeof window !== 'undefined' && (
          <QRCodeCanvas
            value={`${window.location.origin.toString()}/tracking/${orderIdForQrCode}`}
            id={`qrcode-${orderIdForQrCode}`}
            size={500}
            level="H"
          />
        )}
      </$SectionCode>
    </>
  )
}
