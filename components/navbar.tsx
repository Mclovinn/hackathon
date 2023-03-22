import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box, { BoxProps } from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Drawer, DrawerProps, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import styled from 'styled-components'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import BlockwiseIcon from '../lib/icons/blockwise_icon'
import TrackingIcon from '../lib/icons/tracking_icon'
import { useStoreActions, useStoreState } from '../store/hooks'
import router from 'next/router'
import { HOME_URL, ORDERS_URL, TRACKING_URL } from './constant/url-routes'
import { UserRole } from '../types/user.type'
import { AuthService } from '../services/auth.service'

export default function MenuAppBar() {
  const [open, setOpen] = React.useState(false)
  const { sessionModel } = useStoreState(store => store)
  const { session } = sessionModel
  const setClearSession = useStoreActions(state => state.sessionModel.clearSessionThunk)
  const authService = new AuthService()

  const $StyledBox = styled((props: BoxProps) => <Box {...props} />)(({ theme }) => ({
    '& .MuiPaper-root': {
      background: theme.palette.colors.nero,
    },
  }))
  const $StyledDrawer = styled((props: DrawerProps) => <Drawer elevation={12} {...props} />)(({ theme }) => ({
    '& .MuiBackdrop-root': {
      marginTop: 64,
    },

    '& .MuiPaper-root': {
      borderRadius: 0,
      marginTop: 61,
      minWidth: 250,
      background: theme.palette.colors.nero,
      boxShadow: 'none',

      '& .MuiBox-root': {
        height: 'calc(100% - 64px)',
        '& nav': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },

        '& ul:first-child': {
          '& li:first-child': {
            padding: '20px 16px',
          },
        },

        '& ul:last-child': {
          marginBottom: '5px',
        },
      },
      '& .MuiListItem-root': {
        padding: '8px 26px',
      },
    },
  }))

  const navLinks = [
    {
      title: 'Profile',
      path: '#',
      icon: <PersonIcon />,
      isVisibleAll: true,
    },
    {
      title: 'Orders',
      path: ORDERS_URL,
      icon: <DescriptionOutlinedIcon />,
      isVisibleAll: false,
    },
    {
      title: 'Tracking',
      path: TRACKING_URL,
      icon: <TrackingIcon width={26} height={22} />,
      isVisibleAll: false,
    },
  ]

  return (
    <$StyledBox sx={{ width: '100vw' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

          {session.name && (
            <>
              <Typography sx={{ mr: 2 }}>{`${session.name}  `}</Typography>

              <div>
                <IconButton edge="start">
                  <AccountCircle></AccountCircle>
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <$StyledDrawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <Box>
          <nav>
            <List>
              <ListItem disablePadding onClick={() => router.push(`${HOME_URL}`)}>
                <ListItemIcon>
                  <BlockwiseIcon width={170} height={33} />
                </ListItemIcon>
              </ListItem>
              {navLinks.map(item =>
                item.isVisibleAll ? (
                  <ListItem disablePadding key={item.title} onClick={() => router.push(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </ListItem>
                ) : (
                  session?.role === UserRole.WAREHOUSE_OPERATOR && (
                    <ListItem disablePadding key={item.title} onClick={() => router.push(item.path)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                  )
                )
              )}
            </List>
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  authService.logout()
                  setClearSession()
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </ListItem>
            </List>
          </nav>
        </Box>
      </$StyledDrawer>
    </$StyledBox>
  )
}
