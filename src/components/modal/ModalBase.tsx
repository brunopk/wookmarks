import * as Mui from '@mui/material'
import { Fragment, memo, ReactNode } from 'react'
import { MODAL_PADDING_IN_REM } from '../../style'

const MODAL_WIDTH = 500

const DialogTitle = Mui.styled(
  Mui.DialogTitle,
  {}
)<Mui.DialogTitleProps>(() => ({
  padding: `${MODAL_PADDING_IN_REM * 4}rem ${MODAL_PADDING_IN_REM * 6}rem ${MODAL_PADDING_IN_REM * 6}rem ${MODAL_PADDING_IN_REM * 6}rem`
}))

const DialogContent = Mui.styled(
  Mui.DialogContent,
  {}
)<Mui.DialogContentProps>(({theme}) => ({
  padding: `inherit ${MODAL_PADDING_IN_REM * 6}rem`,
  [theme.breakpoints.up('sm')]: {
    width: `${MODAL_WIDTH}px`
  },
}))

const DialogActions = Mui.styled(
  Mui.DialogActions,
  {}
)<Mui.DialogActionsProps>(() => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-between',
  padding: `${MODAL_PADDING_IN_REM * 4}rem ${MODAL_PADDING_IN_REM * 6}rem`
}))

type ModalBaseProps = {
  children: ReactNode
  title: string
  open: boolean
  PrimaryActionButton: ReactNode
  SecondaryActionButton: ReactNode
  onClose: () => void
}

function ModalBase({
  children,
  open,
  title,
  PrimaryActionButton,
  SecondaryActionButton,
  onClose
}: ModalBaseProps) {
  const handleModalClose = () => {
    onClose()
  }

  const theme = Mui.useTheme()

  const isSmallScreen = Mui.useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fragment>
      <Mui.Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={isSmallScreen}
      >
          <DialogTitle id="alert-dialog-title" variant="h5">
            {title}
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            {PrimaryActionButton}
            {SecondaryActionButton}
          </DialogActions>
      </Mui.Dialog>
    </Fragment>
  )
}

export default memo(ModalBase)
