import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CheckIcon from '@mui/icons-material/Check'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import { OrdersReport } from '../../../models/report'
import { getOrdersReport } from '../../../services/frontend-services/orders'
import DeliveredOrderIcon from '../../../lib/icons/delivered-order-icon'
import PendingOrderIcon from '../../../lib/icons/pending-order-icon'

const $CardTitle = styled(Typography)`
  display: flex;
  align-items: center;
  height: 45px;
  background-image: url('images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  svg {
    width: 50px;
  }
`

const $CardHeader = styled(CardContent)`
  padding: 0;
  :last-child {
    padding-bottom: 10px;
  }
`

const $ListItemIcon = styled(ListItemIcon)`
  min-width: 35px;
`

const CardsDetail = (): ReactElement => {
  const [orderReport, setOrderReport] = useState<OrdersReport | undefined>()

  const getOrderReport = async () => {
    try {
      const data = await getOrdersReport()
      setOrderReport(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getOrderReport()
  }, [])

  return (
    <>
      <Card
        sx={{
          width: {
            xs: 0.85,
            md: 600,
          },
        }}
      >
        <$CardHeader>
          <$CardTitle gutterBottom variant="h6">
            <DescriptionOutlinedIcon />
            Active Orders
          </$CardTitle>
          <List dense>
            <ListItem>
              <$ListItemIcon>
                <WarehouseOutlinedIcon fontSize="small" />
              </$ListItemIcon>
              <ListItemText
                primary={
                  !orderReport ? <Skeleton width={175} /> : `${orderReport?.readyToFullfil} Orders in the warehouse`
                }
              />
            </ListItem>
            <ListItem>
              <$ListItemIcon>
                <DeliveredOrderIcon width={18} height={18} />
              </$ListItemIcon>
              <ListItemText
                primary={!orderReport ? <Skeleton width={145} /> : `${orderReport?.inTransit} Delivery pending`}
              />
            </ListItem>
          </List>
        </$CardHeader>
      </Card>
      <Card
        sx={{
          width: {
            xs: 0.85,
            md: 600,
          },
        }}
      >
        <$CardHeader>
          <$CardTitle gutterBottom variant="h6">
            <CheckIcon />
            Orders Delivered
          </$CardTitle>
          <List dense>
            <ListItem>
              <$ListItemIcon>
                <PendingOrderIcon width={18} height={18} />
              </$ListItemIcon>
              <ListItemText
                primary={!orderReport ? <Skeleton width={135} /> : `${orderReport?.delivered} Orders delivered`}
              />
            </ListItem>
          </List>
        </$CardHeader>
      </Card>
    </>
  )
}

export default CardsDetail
