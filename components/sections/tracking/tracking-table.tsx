import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import { EventType } from '../../../types/tracking.type'
import { getOrderAddress } from '../../../services/frontend-services/google-maps'

interface TrackingTableProps {
  events: EventType[]
}

export const TrackingTable = ({ events }: TrackingTableProps) => {
  const [eventsParsed, setEventsParsed] = useState<EventType[]>()

  useEffect(() => {
    if (!events) return
    setOrders(events)
  }, [events])

  const setOrders = async (events: EventType[]) => {
    let newParsedOrders: EventType[] = []
    for (const event of events) {
      const address = await getOrderAddress(event.location.latitude, event.location.longitude)
      newParsedOrders.push({
        ...event,
        locationAddress: address,
      })
    }
    setEventsParsed(newParsedOrders)
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, height: 'fit-content' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventsParsed?.map((event, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{`${event.locationAddress}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
