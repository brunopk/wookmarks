import { LinearProgress } from '@mui/material'

function ScanningModalProgressBar({ value, show, showValue }: UI.Scanning.ModalProgressBarProps) {
  return (
    <>
      {show && !showValue && <LinearProgress />}
      {show && showValue && <LinearProgress variant="determinate" value={value} />}
    </>
  )
}

export default ScanningModalProgressBar
