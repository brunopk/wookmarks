import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import NotFound from './components/NotFound'
import Bookmarks from './components/pages/bookmarks/Main'
import Settings from './components/pages/configuration/Main'
import Stats from './components/pages/stats/Main'
import { BOOKMARKS_PATH, SETTINGS_PATH, STATS_PATH } from './config'
import { SnackBarProvider } from './context/SnackBarContext'

// TODO: check if folders are rendered multiple times whenever a snackbar changes

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    components: {
      MuiPaginationItem: {
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
      },
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

  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/bookmarks" replace />} />
            <Route path={STATS_PATH} element={<Stats />} />
            <Route path={BOOKMARKS_PATH} element={<Bookmarks />} />
            <Route path={SETTINGS_PATH} element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackBarProvider>
    </ThemeProvider>
  )
}

export default App
