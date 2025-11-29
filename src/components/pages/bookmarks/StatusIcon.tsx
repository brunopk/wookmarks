import { Typography } from '@mui/material'
import { BookmarksTreeItem } from '../../../utils/tree-utils'

/**************************************************************************************************/
/*                                             TYPES                                              */
/**************************************************************************************************/

type StatusIconProps = {
  bookmarksTreeItem: BookmarksTreeItem
}

/**************************************************************************************************/
/*                                       EXPORTED COMPONENT                                       */
/**************************************************************************************************/

function StatusIcon({ bookmarksTreeItem }: StatusIconProps) {
  let emoji = '🟡'
  switch (bookmarksTreeItem.status) {
    case 'OFFLINE':
      emoji = '🔴'
      break
    case 'ONLINE':
      emoji = '🟢'
      break
    case 'TIME_OUT':
      emoji = '🟡'
      break
    default:
      throw new Error(
        `Unknown bookmark status ${bookmarksTreeItem.status} for "${bookmarksTreeItem.name}"`
      )
  }
  return <Typography>{emoji}</Typography>
}

export default StatusIcon
