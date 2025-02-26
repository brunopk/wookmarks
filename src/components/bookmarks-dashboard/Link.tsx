import { Link } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon  from '@mui/material/ListItemIcon'
import ListItemText  from '@mui/material/ListItemText'

type LinkProps = {
  text: string,
  isLinkOff: boolean
}

function SubFolder({ text, isLinkOff }: LinkProps) {
  return (
    <ListItemButton>
      <ListItemIcon>
        <Link color={isLinkOff ? 'error' : 'action'} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            color={isLinkOff ? 'error' : 'action'}
            sx={{ fontWeight: isLinkOff ? 'bold' : 'inherit' }}
          >
            {text}
          </Typography>
        }
        sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}
        color={isLinkOff ? 'error' : 'action'}
      />
    </ListItemButton>
  )
}

export default SubFolder
