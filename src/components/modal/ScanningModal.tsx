import { Button, LinearProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ModalBase from './ModalBase'
import { memo } from 'react'
import { BoxProps, styled } from '@mui/system'

const MODAL_ROW_PADDING_IN_REM = 0.25

const Row = styled(Box)<BoxProps>(() => ({
  padding: `${MODAL_ROW_PADDING_IN_REM}rem`, 
  display: 'flex'
}))

const ProgressBarRow = styled(Box)<BoxProps>(() => ({
  padding: `${MODAL_ROW_PADDING_IN_REM * 10}rem 0 ${MODAL_ROW_PADDING_IN_REM}rem ${MODAL_ROW_PADDING_IN_REM}rem`
}))

type ScanningModalProps = {
  open: boolean
  onClose: () => void
}

function ScanningModal({ open, onClose }: ScanningModalProps) {
  const handleModalClose = () => {
    onClose()
  }

  const PrimaryActionButton = (
    <Button onClick={handleModalClose} autoFocus>
      Start
    </Button>
  )

  const SecondaryActionButton = <Button onClick={handleModalClose}>Stop</Button>

  return (
    <ModalBase
      title="Bookmark scanning"
      open={open}
      primaryActionComponent={PrimaryActionButton}
      secondaryActionComponent={SecondaryActionButton}
      onClose={handleModalClose}
    >
      <Row>
        <Typography sx={{ flex: 0 }}>🔖</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Bookmarks
        </Typography>
        <Typography sx={{ flex: 0 }}>12</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>📁</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Folders
        </Typography>
        <Typography sx={{ flex: 0 }}>3</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>🟢</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Online
        </Typography>
        <Typography sx={{ flex: 0 }}>4</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>🟡</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Time out
        </Typography>
        <Typography sx={{ flex: 0 }}>4</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>🔴</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Offline
        </Typography>
        <Typography sx={{ flex: 0 }}>4</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>⏰</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_ROW_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Elapsed time
        </Typography>
        <Typography sx={{ flex: 0 }}>3s</Typography>
      </Row>
      <ProgressBarRow>
        <LinearProgress />
      </ProgressBarRow>
    </ModalBase>
  )
}

export default memo(ScanningModal)
