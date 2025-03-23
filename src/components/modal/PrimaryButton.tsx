import { ButtonProps, Button as MuiButton, styled } from '@mui/material'
import { memo, MouseEventHandler } from 'react'

const Button = styled(
  MuiButton,
  {}
)<ButtonProps>(() => ({
  width: '7rem'
}))

type PrimaryButtonProps = {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <Button onClick={onClick} variant="contained" color="primary" autoFocus>
      {text}
    </Button>
  )
}

export default memo(PrimaryButton)
