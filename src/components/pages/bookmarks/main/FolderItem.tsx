import { FolderOpen, Link } from '@mui/icons-material'
import * as Mui from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import FolderItemMenu from './FolderItemMenu'

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

type FolderItemProps = {
  text: string
  id: number
  icon: 'link' | 'folder'
  typographySx?: Mui.SxProps<Mui.Theme>
  color?: 'error' | 'action'
  selected: boolean
  onSelect: (id: number) => void
  onDeletionModalOpen: () => void
}

function FolderItem({
  text,
  id,
  icon,
  color = 'action',
  typographySx = {},
  selected,
  onSelect,
  onDeletionModalOpen
}: FolderItemProps) {

  const handleClick = () => {
    onSelect(id)
  }

  return (
    <Box onClick={handleClick} selected={selected}>
      <ListItemIcon sx={{ alignItems: 'center' }}>
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
        color={color}
      />
     <FolderItemMenu onDeletionModalOpen={onDeletionModalOpen} />
    </Box>
  )
}

export default FolderItem
