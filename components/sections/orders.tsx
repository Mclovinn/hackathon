import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { Box } from '@mui/material'
import styled from 'styled-components'
import Dropdown from '../common/dropdown.component'
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

type TableRowType = {
  id: string
  col1: string
  col2: string
  col3: OrderStatus
  col4: number
  col5: string
}

const columns: GridColDef[] = [
  { headerClassName: 'super-app-theme--header', field: 'col1', headerName: 'Order ID', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col2', headerName: 'SKU', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col3', headerName: 'Status', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col4', headerName: 'Destination Address', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col5', headerName: 'Tracking ID', width: 150 },
]

export function Orders() {
  const { data: orders } = useQuery('get-orders', getOrders)
  const [parsedOrders, setParsedOrders] = useState<TableRowType[]>([])

  useEffect(() => {
    if (!orders) return

    let newParsedOrders: TableRowType[] = []
    // TODO - Set real address name for destination
    orders.forEach(order => {
      newParsedOrders.push({
        id: order.id,
        col1: order.id,
        col2: order.sku,
        col3: order.status,
        col4: order.destinationAddress.latitude,
        col5: order.trackingId,
      })
    })
    setParsedOrders(newParsedOrders)
  }, [orders])

  return (
    <$GridContainer>
      <$GridHeader>
        <Dropdown />
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
        />
      </Box>
    </$GridContainer>
  )
}
