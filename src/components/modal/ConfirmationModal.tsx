import { Typography } from '@mui/material'
import { memo } from 'react'
import ModalBase from './ModalBase'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

type ConfirmationModalProps = {
  open: boolean
  text: string
  onAccept: () => void
  onCancel: () => void
}

function ModalYesNo({ open, text, onAccept, onCancel }: ConfirmationModalProps) {
  const primaryActionButton = <PrimaryButton onClick={onAccept} text="YES" />

  const secondaryActionButton = <SecondaryButton onClick={onCancel} text="NO" />

  return (
    <ModalBase
      title="Bookmark deletion"
      open={open}
      primaryActionButton={primaryActionButton}
      secondaryActionButton={secondaryActionButton}
      onClose={() => null}
    >
      <Typography>{text}</Typography>
    </ModalBase>
  )
}

export default memo(ModalYesNo)
