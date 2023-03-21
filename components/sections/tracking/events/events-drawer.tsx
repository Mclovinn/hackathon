import { Button, SwipeableDrawer } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'

const $Button = styled(Button)``
const $Container = styled.div`
  position: absolute;
  bottom: 25px;
`

interface EventsDrawerProps {
  showTopBar?: boolean
}

export const EventsDrawer = ({}: EventsDrawerProps) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <$Container>
      <$Button variant="contained" onClick={toggleDrawer(!open)} startIcon={<ListAltOutlinedIcon />}>
        Events
      </$Button>
      <SwipeableDrawer anchor="bottom" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <h5>list</h5>
        <h5>list</h5>
        <h5>list</h5>
        <h5>list</h5>
        <h5>list</h5>
        <h5>list</h5>
      </SwipeableDrawer>
    </$Container>
  )
}
