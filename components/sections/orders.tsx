import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar, GridSelectionModel } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { Box } from '@mui/material'
import styled from 'styled-components'
import { Dropdown } from '../common/dropdown.component'
import { useQuery } from 'react-query'
import { getOrders } from '../../services/frontend-services/orders'
import { OrderStatus } from '../../types/order-status'

const $GridContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.colors.nero};
  height: fit-content;
  max-width: 1000px;
  height: auto;
  margin: 20px auto;
  border-radius: 12px;
`

const $GridHeader = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 12px 20px;
`

export type TableRowType = {
  id: string
  sku: string
  status: OrderStatus
  latitude: number
  tracking: string
}

const columns: GridColDef[] = [
  { headerClassName: 'super-app-theme--header', field: 'id', headerName: 'Order ID', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'sku', headerName: 'SKU', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'status', headerName: 'Status', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'latitude', headerName: 'Destination Address', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'tracking', headerName: 'Tracking ID', width: 150 },
]

export function Orders() {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>()
  const [selectedRows, setSelectedRows] = useState<TableRowType[]>([])
  const { data: orders } = useQuery('get-orders', getOrders)
  const [parsedOrders, setParsedOrders] = useState<TableRowType[]>([])

  useEffect(() => {
    if (!orders) return

    let newParsedOrders: TableRowType[] = []
    // TODO - Set real address name for destination
    orders.forEach(order => {
      newParsedOrders.push({
        id: order.id,
        sku: order.sku,
        status: order.status,
        latitude: order.destinationAddress.latitude,
        tracking: order.trackingId,
      })
    })
    setParsedOrders(newParsedOrders)
  }, [orders])

  return (
    <$GridContainer>
      <$GridHeader>
        <Dropdown selectedOrders={selectedRows} />
      </$GridHeader>
      <Box
        sx={{
          height: 400,
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
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
            padding: '0 20px',
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
    </$GridContainer>
  )
}
