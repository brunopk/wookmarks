import { FolderOpen } from '@mui/icons-material'
import * as Mui from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import { UI } from '../../../types'
import LinkIcon from './LinkIcon'

// TODO: use styled components

const Box = Mui.styled(
  Mui.Box,
  {}
)<Mui.BoxProps & { selected: boolean }>(({ theme }) => ({
  display: 'flex',
  padding: '0.25rem 1em',
  transition: theme.transitions.create('background-color'),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background: theme.palette.action.selected
      }
    }
  ]
}))

const ListItemText = Mui.styled(
  Mui.ListItemText,
  {}
)<Mui.ListItemTextProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  transition: 'none'
}))

function FolderItem({
  id,
  text,
  icon,
  selected,
  status,
  typographySx = {},
  onSelect
}: UI.FolderItemProps) {
  const handleClick = () => {
    onSelect(id)
  }

  return (
    <Box onClick={handleClick} selected={selected}>
      <ListItemIcon sx={{ alignItems: 'center' }}>
        {(() => {
          switch (icon) {
            case 'folder':
              return <FolderOpen />
            case 'link':
              return <LinkIcon status={status} />
            default:
              throw new Error(`Invalid icon ${icon}`)
          }
        })()}
      </ListItemIcon>
      <ListItemText primary={<Typography sx={typographySx}>{text}</Typography>} />
    </Box>
  )
}

export default FolderItem
