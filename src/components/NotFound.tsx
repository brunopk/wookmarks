import Typography from '@mui/material/Typography'
import Layout from './Page'
import BaseMenu from './BaseMenu'

function NotFound() {
  return (
    <Layout Menu={BaseMenu}>
      <Typography variant="h6">⚠️ Not found</Typography>
    </Layout>
  )
}

export default NotFound
