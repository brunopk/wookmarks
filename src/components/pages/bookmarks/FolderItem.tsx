import { Theme } from '@emotion/react'
import { FolderOpen, Link, MoreVert } from '@mui/icons-material'
import { SxProps } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';



type FolderItemMenuEntry = {
  text: string
}

type FolderItemProps = {
  text: string
  icon: 'link' | 'folder'
  typographySx?: SxProps<Theme>
  color?: 'error' | 'action'
  menu: FolderItemMenuEntry[]
}


function FolderItem({ icon, color = 'action', typographySx = {}, text }: FolderItemProps) {
  const theme = useTheme()
  
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMoreVertClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation() // Do not propagate event to the whole list item
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation() // Do not propagate event to the whole list item
    setAnchorEl(null)
  }

  const handleClick = () => {
    console.log('Handle click')
  }

  return (
    <Box onClick={handleClick} sx={{display: 'flex', '&:hover': {
            backgroundColor: theme.palette.mode == 'dark'? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
          },
          transition: 'background-color 0.3s', padding: '0.25rem 1em'}}>
      <ListItemIcon sx={{alignItems: 'center' }}>
        {(() => {
          switch (icon) {
            case 'folder':
              return <FolderOpen color={color} />
            case 'link':
              return <Link color={color} />
            default:
              throw new Error(`Invalid icon ${icon}`)
          }
        })()}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography color={color} sx={typographySx}>
            {text}
          </Typography>
        }
        sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, transition: 'none'}}
        color={color}
      />
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMoreVertClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export default FolderItem
