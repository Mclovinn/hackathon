import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { DataGrid, GridColDef, GridToolbar, GridSelectionModel, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, BoxProps, Button, ButtonProps, IconButton } from '@mui/material'
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
  width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 12px;
`

const $GridHeader = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 15px;
  margin-top: 30px;
`

const $LoaderWrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const $SectionCode = styled.div`
  display: none;
`

const $StyledBox = styled((props: BoxProps) => <Box {...props} />)(({ theme }) => ({
  height: 669,
  width: '100%',
  padding: '0 28px 0px 35px',
  marginTop: '-57px',

  '& .MuiDataGrid-root': {
    '& .MuiDataGrid-toolbarContainer button': {
      color: theme.palette.colors.summerSky,
      margin: '9px',
    },

    '& .MuiDataGrid-columnHeadersInner': {
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 400,
      },
      '& .css-1e6ud36-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
        color: theme.palette.colors.summerSky,
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
    },

    '& .MuiDataGrid-row': {
      fontFamily: 'Lato',
      fontSize: '0.813rem',
      '&.Mui-selected': {
        background: 'transparent',
        '& div span': {
          color: theme.palette.colors.summerSky,
        },
      },
    },

    '& .MuiDataGrid-footerContainer': {
      padding: '13px 0',
      borderBlockStart: 'none',
    },
  },
  '& .super-app-theme--header': {
    fontSize: '1rem',
  },
}))

const $StyledButton = styled((props: ButtonProps) => <Button {...props} />)(({ theme }) => ({
  width: '128px',
  fontFamily: 'Lato',
  padding: '2px 16px',
  fontWeight: 400,
  fontSize: '0.813rem',

  '&.READY_TO_FULFILL': {
    background: theme.palette.colors.warningMain,
    color: theme.palette.colors.white,
  },

  '&.DELIVERED': {
    background: theme.palette.colors.greenLight,
    color: theme.palette.colors.white,
  },

  '&.IN_TRANSIT': {
    borderColor: theme.palette.colors.greenLight,
    color: theme.palette.colors.white,
  },
}))

export type TableRowType = {
  id: string
  sku: string
  status: OrderStatus
  address: string
  tracking: string
}

const generatePDF = (trackingId: string) => {
  const pdf = new jsPDF({
    unit: 'cm',
    format: [10, 15],
  })
  const canvas = document.getElementById(`qrcode-${trackingId}`) as HTMLCanvasElement
  const base64Image = canvas.toDataURL()

  pdf.addImage(base64Image, 'svg', 2.5, 3, 5, 5)
  pdf.setFontSize(10)
  pdf.text(trackingId, 5, 8.5, { align: 'center' })
  pdf.setProperties({
    title: trackingId,
  })
  window.open(pdf.output('bloburl'))
}

export function Orders() {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>()
  const [selectedRows, setSelectedRows] = useState<TableRowType[]>([])
  const [trackingIdForQrCode, setTrackingIdForQrCode] = useState<string>('')
  const { data: orders, refetch } = useQuery('get-orders', getOrders)
  const [parsedOrders, setParsedOrders] = useState<TableRowType[]>([])
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [locationPath, setLocationPath] = useState<string>('')
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

  const ButtonType = (status: OrderStatus) => {
    return (
      <$StyledButton
        variant={status === OrderStatus.IN_TRANSIT ? 'outlined' : 'contained'}
        className={status}
        disableElevation
      >
        {status.replace(/_/g, ' ')}
      </$StyledButton>
    )
  }

  const columns: GridColDef[] = [
    { headerClassName: 'super-app-theme--header', field: 'id', headerName: 'Order ID', width: 300 },
    { headerClassName: 'super-app-theme--header', field: 'sku', headerName: 'SKU', width: 100 },
    {
      headerClassName: 'super-app-theme--header',
      field: 'status',
      headerName: 'Status',
      width: 148,
      align: 'center',
      renderCell: (params: GridRenderCellParams<any, TableRowType>) => ButtonType(params.row.status),
    },
    { headerClassName: 'super-app-theme--header', field: 'address', headerName: 'Destination Address', width: 185 },
    { headerClassName: 'super-app-theme--header', field: 'tracking', headerName: 'Tracking ID', width: 300 },
    { headerClassName: 'super-app-theme--header', field: 'manifest', headerName: 'Manifest', width: 150 },
    {
      headerClassName: 'super-app-theme--header',
      field: 'document',
      headerName: 'Shipping Document',
      width: 180,
      align: 'center',
      renderCell: (params: GridRenderCellParams<any, TableRowType>) =>
        params.row.status !== OrderStatus.READY_TO_FULFILL && (
          <>
            <IconButton
              aria-label="pdf-document"
              onClick={() => setTrackingIdForQrCode(params.row.tracking)}
              size="medium"
            >
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
    const path = window.location.origin.toString()
    if (path) setLocationPath(path)
  }, [])

  useEffect(() => {
    if (!trackingIdForQrCode) return
    generatePDF(trackingIdForQrCode)
    setTrackingIdForQrCode('')
  }, [trackingIdForQrCode])

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
        <$StyledBox>
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
        </$StyledBox>
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
        {locationPath && (
          <QRCodeCanvas
            value={`${locationPath}/tracking/${trackingIdForQrCode}`}
            id={`qrcode-${trackingIdForQrCode}`}
            size={500}
            level="H"
          />
        )}
      </$SectionCode>
    </>
  )
}
