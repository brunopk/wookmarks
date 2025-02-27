import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import BookmarksDashboard from './components/pages/bookmarks/Dashboard'
import NotFound from './components/NotFound'
import WorkInProgress from './components/WorkInProgress'

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/bookmarks" replace />} />
          <Route path="/stats" element={<WorkInProgress/>} />
          <Route path="/bookmarks" element={<BookmarksDashboard/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
