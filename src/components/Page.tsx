import RefreshIcon from '@mui/icons-material/Refresh'
import * as Mui from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { Fragment, ReactNode, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BaseMenu from './BaseMenu'
import DrawerButton from './DrawerButton'
import DrawerHeader from './DrawerHeader'

const MODAL_ROW_PADDING_IN_REM = 0.25

const MODAL_WIDTH = 500

const Main = styled('main')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  flexGrow: 1,
  padding: '2rem 1rem 1rem 1rem'
}))

const Typography = styled(Mui.Typography)<Mui.TypographyProps>(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  flexGrow: 1
}))

const DashboardTitle = styled(Mui.Typography)<Mui.TypographyProps>(() => ({
  paddingLeft: '2rem',
  display: 'flex',
  flexGrow: 1
}))

type PageProps = {
  Menu?: ReactNode
  children: ReactNode
  menuWidthInRem?: number
}

function Page({ children, menuWidthInRem, Menu }: PageProps) {
  const location = useLocation()
  const {
    page: { title: dashboardTitle }
  } = location.state || { page: { title: '' } }

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const handleRefreshButtonClick = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const handleDrawerOpen = () => setDrawerOpen(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <DrawerButton handleDrawerOpen={handleDrawerOpen} />
          <DashboardTitle variant="h6" noWrap component="div">
            {dashboardTitle}
          </DashboardTitle>
          <Mui.IconButton color="inherit" onClick={handleRefreshButtonClick}>
            <RefreshIcon />
          </Mui.IconButton>
        </Toolbar>
      </AppBar>
      <BaseMenu widthInRem={menuWidthInRem} Menu={Menu} open={drawerOpen} setOpen={setDrawerOpen} />
      <Main>
        <DrawerHeader />
        {children}
      </Main>
      <Fragment>
        <Mui.Dialog
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={{ width: `${MODAL_WIDTH}px` }}>
            <Mui.DialogTitle id="alert-dialog-title" variant="h5">
              Bookmark scanning
            </Mui.DialogTitle>
            <Mui.DialogContent>
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
                <Mui.LinearProgress />
              </Box>
            </Mui.DialogContent>
            <Mui.DialogActions>
              <Mui.Button onClick={handleModalClose}>Stop</Mui.Button>
              <Mui.Button onClick={handleModalClose} autoFocus>
                Start
              </Mui.Button>
            </Mui.DialogActions>
          </Box>
        </Mui.Dialog>
      </Fragment>
    </Box>
  )
}

export default Page
