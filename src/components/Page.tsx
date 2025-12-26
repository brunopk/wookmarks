import RefreshIcon from '@mui/icons-material/Refresh'
import * as Mui from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { ReactNode, useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DrawerButton from './DrawerButton'
import DrawerHeader from './DrawerHeader'
import BaseMenu from './MainMenu'
import ScanningModal from './modal/ScanningModal'
import SnackBar from './SnackBar'

const Main = styled('main')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  flexGrow: 1,
  padding: '2rem 1rem 1rem 1rem'
}))

const DashboardTitle = styled(Mui.Typography)<Mui.TypographyProps>(() => ({
  paddingLeft: '2rem',
  display: 'flex',
  flexGrow: 1
}))

/**************************************************************************************************/
/*                                  EXPORTED COMPONENT AND TYPES                                  */
/**************************************************************************************************/

export type PageProps = {
  menu?: ReactNode
  children: ReactNode
  menuWidthInRem?: number
}

export function Page({ children, menuWidthInRem, menu }: PageProps) {
  const location = useLocation()

  const {
    page: { title: dashboardTitle }
  } = location.state || { page: { title: '' } }

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const handleRefreshButtonClick = () => {
    setModalOpen(true)
  }
  const handleModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

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
      <Main>
        <DrawerHeader />
        {children}
      </Main>
      <BaseMenu
        widthInRem={menuWidthInRem}
        content={menu}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
      <ScanningModal open={modalOpen} onClose={handleModalClose} />
      <SnackBar />
    </Box>
  )
}
