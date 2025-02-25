import { FolderOpen } from '@mui/icons-material'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon  from '@mui/material/ListItemIcon'
import ListItemText  from '@mui/material/ListItemText'

type SubFolderProps = {
  text: string
}

function SubFolder({ text }: SubFolderProps) {
  return (
    <ListItemButton>
      <ListItemIcon>
        <FolderOpen />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton> 
  )
}

export default SubFolder
