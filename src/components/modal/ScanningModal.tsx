import { LinearProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { BoxProps, styled } from '@mui/system'
import { memo } from 'react'
import { MODAL_PADDING_IN_REM } from '../../style'
import ModalBase from './ModalBase'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const Row = styled(Box)<BoxProps>(() => ({
  padding: `${MODAL_PADDING_IN_REM}rem`,
  display: 'flex'
}))

const ProgressBarRow = styled(Box)<BoxProps>(() => ({
  padding: `${MODAL_PADDING_IN_REM * 10}rem 0 ${MODAL_PADDING_IN_REM}rem ${MODAL_PADDING_IN_REM}rem`
}))

type ScanningModalProps = {
  open: boolean
  onClose: () => void
}

function ScanningModal({ open, onClose }: ScanningModalProps) {
  const handleModalClose = () => {
    onClose()
  }

  const primaryActionButton = (
    <PrimaryButton onClick={() => alert('Not implemented')} text="START" />
  )

  const secondaryActionButton = <SecondaryButton onClick={handleModalClose} text="STOP" />

  return (
    <ModalBase
      title="Bookmark scanning"
      open={open}
      primaryActionButton={primaryActionButton}
      secondaryActionButton={secondaryActionButton}
      onClose={handleModalClose}
    >
      <Row>
        <Typography sx={{ flex: 0 }}>🔖</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Bookmarks
        </Typography>
        <Typography sx={{ flex: 0 }}>12</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>📁</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Folders
        </Typography>
        <Typography sx={{ flex: 0 }}>3</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>🟢</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Online
        </Typography>
        <Typography sx={{ flex: 0 }}>4</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>🟡</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Time out
        </Typography>
        <Typography sx={{ flex: 0 }}>4</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>🔴</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_PADDING_IN_REM * 5}rem`, flex: 1 }}>
          Offline
        </Typography>
        <Typography sx={{ flex: 0 }}>4</Typography>
      </Row>
      <Row>
        <Typography sx={{ flex: 0 }}>⏰</Typography>
        <Typography sx={{ paddingLeft: `${MODAL_PADDING_IN_REM * 5}rem`, flex: 1 }}>
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
