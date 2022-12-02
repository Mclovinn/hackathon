import * as React from 'react'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { Box } from '@mui/material'
import styled from 'styled-components'
import Dropdown from '../common/dropdown.component'

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

const rows: GridRowsProp = [
  {
    id: 1,
    col1: '000001',
    col2: '19631avAWg532Ncv397bnM',
    col3: 'On Transit',
    col4: '4303 Lochmere Lane',
    col5: 'RH592501066CN',
  },
  {
    id: 2,
    col1: '000002',
    col2: '13934avAWg532Ncv397krT',
    col3: 'Ready to fulfill',
    col4: '1892 Rocket Drive',
    col5: 'RH510704820CN',
  },
  {
    id: 3,
    col1: '000003',
    col2: '10534avAWg532Ncv397ioQ',
    col3: 'On Transit',
    col4: '3227 Airplane Avenue',
    col5: 'RH198027657CN',
  },
  {
    id: 4,
    col1: '000004',
    col2: '11034avAWg532Ncv397ppB',
    col3: 'Delivered',
    col4: '1483 Oral Lake Road',
    col5: 'RH663410153CN',
  },
  {
    id: 5,
    col1: '000005',
    col2: '10034avAWg532Ncv397qvC',
    col3: 'Delivered',
    col4: '4921 Kenwood Place',
    col5: 'RH079667955CN',
  },
]

const columns: GridColDef[] = [
  { headerClassName: 'super-app-theme--header', field: 'col1', headerName: 'Order ID', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col2', headerName: 'SKU', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col3', headerName: 'Status', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col4', headerName: 'Destination Address', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'col5', headerName: 'Tracking ID', width: 150 },
]

export function Orders() {
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </$GridContainer>
  )
}
