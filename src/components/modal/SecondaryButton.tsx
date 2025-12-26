import { ButtonProps, Button as MuiButton, styled } from '@mui/material'
import { memo, MouseEventHandler } from 'react'

const Button = styled(
  MuiButton,
  {}
)<ButtonProps>(() => ({
  width: '7rem'
}))

type SecondaryButtonProps = {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

function SecondaryButton({ text, onClick }: SecondaryButtonProps) {
  return (
    <Button onClick={onClick} variant="contained" color="inherit" autoFocus>
      {text}
    </Button>
  )
}

export default memo(SecondaryButton)
