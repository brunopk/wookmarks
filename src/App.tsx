import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Bookmarks from './components/pages/bookmarks/Main'
import Settings from './components/pages/configuration/Main'
import Stats from './components/pages/stats/Main'
import NotFound from './components/NotFound'
import WorkInProgress from './components/WorkInProgress'
import {STATS_PATH, SETTINGS_PATH, BOOKMARKS_PATH} from './config'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    components: {
      "MuiPaginationItem": {
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
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/bookmarks" replace />} />
          <Route path={STATS_PATH} element={<Stats/>} />
          <Route path={BOOKMARKS_PATH} element={<Bookmarks/>} />
          <Route path={SETTINGS_PATH} element={<Settings/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
