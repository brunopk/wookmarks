import { FolderOpen } from '@mui/icons-material'
import * as Mui from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import { BookmarksTreeItem } from '../../../utils/tree-utils'
import StatusIcon from './StatusIcon'

/**************************************************************************************************/
/*                                         SUB-COMPONENTS                                         */
/**************************************************************************************************/

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

// TODO: Change typography (if it is a link based) on this typographySx={{ fontWeight: isLinkOff ? 'bold' : 'inherit' }}

/**************************************************************************************************/
/*                                  EXPORTED COMPONENT AND TYPES                                  */
/**************************************************************************************************/

export type FolderItemProps = {
  bookmarksTreeItem: BookmarksTreeItem
  selected: boolean
  typographySx?: Mui.SxProps<Mui.Theme>
  onSelect: (id: number) => void
}

export function FolderItem({
  bookmarksTreeItem,
  selected,
  typographySx = {},
  onSelect
}: FolderItemProps) {
  const handleClick = () => {
    onSelect(bookmarksTreeItem.id)
  }

  return (
    <Box onClick={handleClick} selected={selected}>
      <ListItemIcon sx={{ alignItems: 'center' }}>
        {bookmarksTreeItem.isFolder ? (
          <FolderOpen />
        ) : (
          <StatusIcon bookmarksTreeItem={bookmarksTreeItem} />
        )}
      </ListItemIcon>
      <ListItemText primary={<Typography sx={typographySx}>{bookmarksTreeItem.name}</Typography>} />
    </Box>
  )
}
