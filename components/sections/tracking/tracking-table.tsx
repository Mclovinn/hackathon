import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(orderId: number, adress: string) {
  return { orderId, adress }
}

const rows = [
  createData(1, 'Colón 125'),
  createData(2, 'Jujuy 127'),
  createData(3, '9 de Julio 365'),
  createData(4, 'Paraná 443'),
]

export const TrackingTable = () => {
  return (
    <TableContainer component={Paper} sx={{ width: 300, marginLeft: 10, height: 300 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="left">{row.adress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
