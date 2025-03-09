import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Box from '@mui/material/Box'
import { Fragment, memo, ReactNode } from 'react'

const MODAL_WIDTH = 500

type ModalBaseProps = {
  children: ReactNode
  title: string
  open: boolean
  primaryActionComponent: ReactNode
  secondaryActionComponent: ReactNode
  onClose: () => void
}

function ModalBase({
  children,
  open,
  title,
  primaryActionComponent,
  secondaryActionComponent,
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
            {primaryActionComponent}
            {secondaryActionComponent}
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default memo(ModalBase)
