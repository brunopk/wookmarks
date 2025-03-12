import { MoreVert } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { memo, MouseEvent, useState } from 'react'


type FolderItemProps = {
  onDeletionModalOpen: () => void
}

function FolderItemMenu({
  onDeletionModalOpen
}: FolderItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleMoreVertClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation() // Do not propagate event to the whole list item
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation() // Do not propagate event to the whole list item
    setAnchorEl(null)
  }

  const handleDeleteMenuItemClick = () => {
    setAnchorEl(null)
    onDeletionModalOpen()
  }

  return (
    <>
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
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleDeleteMenuItemClick}>Delete</MenuItem>
      </Menu>
    </>
  )
}

export default memo(FolderItemMenu)
