import { Typography } from '@mui/material'

type LinkIconProps = {
  status?: BookmarkStatus
}

function LinkIcon({ status }: LinkIconProps) {
  let emoji = '🟡'
  switch (status) {
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
      throw new Error(`Unknown bookmark status ${status}`)
  }
  return <Typography>{emoji}</Typography>
}

export default LinkIcon
