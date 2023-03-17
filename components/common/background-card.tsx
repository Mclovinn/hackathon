import { Card, CardContent, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const $CardTitle = styled(Typography)`
  display: flex;
  align-items: center;
  height: 45px;
  background-image: url('/images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: flex-start;
  svg {
    width: 50px;
  }
`

const $CardLayout = styled(CardContent)`
  padding: 0;
  :last-child {
    padding-bottom: 10px;
  }
`

const $CardContent = styled.div`
  padding: 5px 5px 20px 5px;
`

const $EmptyIcon = styled.div`
  width: 18px;
`

interface Props {
  title: string
  icon?: ReactElement
  children: ReactElement
}

const BackgroundCard = ({ title, icon, children }: Props): ReactElement => {
  return (
    <Card
      sx={{
        width: {
          xs: 0.9,
          md: 600,
        },
      }}
    >
      <$CardLayout>
        <$CardTitle gutterBottom variant="h6">
          {icon ? icon : <$EmptyIcon />}
          {title}
        </$CardTitle>
        <$CardContent>{children}</$CardContent>
      </$CardLayout>
    </Card>
  )
}

export default BackgroundCard
