import { Button, SwipeableDrawer } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import { TrackingEventsTimeline } from '../tracking-timeline'
import { EventType } from '../../../../types/tracking.type'

const $Container = styled.div`
  position: absolute;
  bottom: 25px;
`

interface EventsDrawerProps {
  events?: EventType[]
}

export const EventsDrawer = ({ events }: EventsDrawerProps) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <$Container>
      <Button variant="contained" onClick={toggleDrawer(!open)} startIcon={<ListAltOutlinedIcon />}>
        Events
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        color="red"
      >
        {events && <TrackingEventsTimeline events={events} />}
      </SwipeableDrawer>
    </$Container>
  )
}
