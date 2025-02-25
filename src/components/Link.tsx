import { Link, LinkOff } from '@mui/icons-material'
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
        {isLinkOff ? <Link /> : <LinkOff />}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton> 
  )
}

export default SubFolder
