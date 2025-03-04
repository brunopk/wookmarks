import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import RefreshIcon from '@mui/icons-material/Refresh'
import * as MuiMaterial from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { createTheme, styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ComponentType, Fragment, ReactNode, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DRAWER_WIDTH = 240

const MODAL_ROW_PADDING_IN_REM = 0.25

const MODAL_WIDTH = 500

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  padding: '1rem',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      }
    }
  ]
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

interface LayoutProps {
  Menu: ComponentType
  children: ReactNode
}

function Layout({ Menu, children }: LayoutProps) {
  const location = useLocation()
  const {
    page: { title: dashboardTitle, isMenuOpen }
  } = location.state || { page: { title: '' } }

  const theme = createTheme({
    palette: {
      mode: 'light'
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:focus-visible': {
              outline: 'none'
            },
            '&:focus': {
              outline: 'none'
            }
          }
        }
      }
    }
  })

  const [open, setOpen] = useState<boolean>(isMenuOpen)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const handleRefreshButtonClick = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2
              },
              open && { display: 'none' }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}
          >
            {dashboardTitle}
          </Typography>
          <Chip
            label="🔴 45"
            sx={{ marginRight: '1rem', fontWeight: 'bold', color: 'white' }}
            variant="outlined"
          />
          <Chip
            label="🟡 70"
            sx={{ marginRight: '1rem', fontWeight: 'bold', color: 'white' }}
            variant="outlined"
          />
          <Chip
            label="🟢 80"
            sx={{ marginRight: '1rem', fontWeight: 'bold', color: 'white' }}
            variant="outlined"
          />
          <IconButton color="inherit" onClick={handleRefreshButtonClick}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Menu />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      <Fragment>
        <MuiMaterial.Dialog
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={{ width: `${MODAL_WIDTH}px` }}>
            <MuiMaterial.DialogTitle id="alert-dialog-title" variant="h5">
              Bookmark scanning
            </MuiMaterial.DialogTitle>
            <MuiMaterial.DialogContent>
              <Box sx={{ padding: `${MODAL_ROW_PADDING_IN_REM}rem`, display: 'flex' }}>
                <Typography sx={{ flex: 0 }}>🔖</Typography>
                <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
                  Bookmarks
                </Typography>
                <Typography sx={{ flex: 0 }}>12</Typography>
              </Box>
              <Box sx={{ padding: `${MODAL_ROW_PADDING_IN_REM}rem`, display: 'flex' }}>
                <Typography sx={{ flex: 0 }}>📁</Typography>
                <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
                  Folders
                </Typography>
                <Typography sx={{ flex: 0 }}>3</Typography>
              </Box>
              <Box sx={{ padding: `${MODAL_ROW_PADDING_IN_REM}rem`, display: 'flex' }}>
                <Typography sx={{ flex: 0 }}>🟢</Typography>
                <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
                  Online
                </Typography>
                <Typography sx={{ flex: 0 }}>4</Typography>
              </Box>
              <Box sx={{ padding: `${MODAL_ROW_PADDING_IN_REM}rem`, display: 'flex' }}>
                <Typography sx={{ flex: 0 }}>🟡</Typography>
                <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
                  Time out
                </Typography>
                <Typography sx={{ flex: 0 }}>4</Typography>
              </Box>
              <Box sx={{ padding: `${MODAL_ROW_PADDING_IN_REM}rem`, display: 'flex' }}>
                <Typography sx={{ flex: 0 }}>🔴</Typography>
                <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
                  Offline
                </Typography>
                <Typography sx={{ flex: 0 }}>4</Typography>
              </Box>
              <Box sx={{ padding: `${MODAL_ROW_PADDING_IN_REM}rem`, display: 'flex' }}>
                <Typography sx={{ flex: 0 }}>⏰</Typography>
                <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
                  Elapsed time
                </Typography>
                <Typography sx={{ flex: 0 }}>3s</Typography>
              </Box>
              <Box
                sx={{
                  padding: `${MODAL_ROW_PADDING_IN_REM * 10}rem 0 ${MODAL_ROW_PADDING_IN_REM}rem ${MODAL_ROW_PADDING_IN_REM}rem`
                }}
              >
                <MuiMaterial.LinearProgress />
              </Box>
            </MuiMaterial.DialogContent>
            <MuiMaterial.DialogActions>
              <MuiMaterial.Button onClick={handleModalClose}>Stop</MuiMaterial.Button>
              <MuiMaterial.Button onClick={handleModalClose} autoFocus>
                Start
              </MuiMaterial.Button>
            </MuiMaterial.DialogActions>
          </Box>
        </MuiMaterial.Dialog>
      </Fragment>
    </Box>
  )
}

export default Layout
