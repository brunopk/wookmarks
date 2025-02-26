import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'
import BookmarksDashboard from './components/bookmarks-dashboard/Dashboard'

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
      <BookmarksDashboard />
    </ThemeProvider>
  )
}

export default App
