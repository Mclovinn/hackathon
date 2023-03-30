import { List, ListItem, ListItemIcon, ListItemText, Skeleton } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import { OrdersReport } from '../../../models/report'
import { getOrdersReport } from '../../../services/frontend-services/orders'
import DeliveredOrderIcon from '../../../lib/icons/delivered-order-icon'
import PendingOrderIcon from '../../../lib/icons/pending-order-icon'
import BackgroundCard from '../../common/background-card'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CheckIcon from '@mui/icons-material/Check'

const $ListItemIcon = styled(ListItemIcon)`
  min-width: 35px !important;
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
      <BackgroundCard title={'Active Orders'} icon={<DescriptionOutlinedIcon />}>
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
              <PendingOrderIcon width={18} height={18} />
            </$ListItemIcon>
            <ListItemText
              primary={!orderReport ? <Skeleton width={145} /> : `${orderReport?.inTransit} Delivery pending`}
            />
          </ListItem>
        </List>
      </BackgroundCard>

      <BackgroundCard title={'Orders Delivered'} icon={<CheckIcon />}>
        <List dense>
          <ListItem>
            <$ListItemIcon>
              <DeliveredOrderIcon width={18} height={18} />
            </$ListItemIcon>
            <ListItemText
              primary={!orderReport ? <Skeleton width={135} /> : `${orderReport?.delivered} Orders delivered`}
            />
          </ListItem>
        </List>
      </BackgroundCard>
    </>
  )
}

export default CardsDetail
