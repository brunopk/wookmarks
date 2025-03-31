import { ChipProps, Chip as MuiChip, styled } from '@mui/material'

const Chip = styled(
  MuiChip,
  {}
)<ChipProps>(() => ({
  marginRight: '1rem',
  fontWeight: 'bold'
}))

type FolderChipProps = {
  status: 'success' | 'warning' | 'error'
  value: number
}

function FolderChip({ status, value }: FolderChipProps) {
  const emoji = { error: '🔴', warning: '🟡', success: '🟢' }[status]
  return <Chip label={`${emoji} ${value}`} variant="outlined" />
}

export default FolderChip
