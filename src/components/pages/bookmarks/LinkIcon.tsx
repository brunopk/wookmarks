import { Typography } from '@mui/material'
import { BookmarkStatus } from '../../../enums'

type LinkIconProps = {
  status?: BookmarkStatus
}

function LinkIcon({ status }: LinkIconProps) {
  const emoji =
    typeof status === 'undefined'
      ? '🟡'
      : {
          [BookmarkStatus.OFFLINE]: '🔴',
          [BookmarkStatus.TIME_OUT]: '🟡',
          [BookmarkStatus.ONLINE]: '🟢'
        }[status]
  return <Typography>{emoji}</Typography>
}

export default LinkIcon
