import * as Mui from '@mui/material'
import { Box, Dialog } from '@mui/material'
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
)<Mui.DialogContentProps>(() => ({
  padding: `inherit ${MODAL_PADDING_IN_REM * 6}rem`
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

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: `${MODAL_WIDTH}px` }}>
          <DialogTitle id="alert-dialog-title" variant="h5">
            {title}
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            {PrimaryActionButton}
            {SecondaryActionButton}
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default memo(ModalBase)
