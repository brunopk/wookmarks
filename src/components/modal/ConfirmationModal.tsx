import { Button, Typography } from '@mui/material'
import { memo } from 'react'
import ModalBase from './ModalBase'

type ConfirmationModalProps = {
  open: boolean
  text: string
  onAccept: () => void
  onCancel: () => void
}

function ModalYesNo({ open, text, onAccept, onCancel }: ConfirmationModalProps) {
  const PrimaryActionButton = (
    <Button onClick={onAccept} autoFocus>
      OK
    </Button>
  )

  const SecondaryActionButton = <Button onClick={onCancel} color='secondary'>Cancel</Button>

  return (
    <ModalBase
      title="Bookmark deletion"
      open={open}
      PrimaryActionButton={PrimaryActionButton}
      SecondaryActionButton={SecondaryActionButton}
      onClose={() => null}
    >
      <Typography>{text}</Typography>
    </ModalBase>
  )
}

export default memo(ModalYesNo)
