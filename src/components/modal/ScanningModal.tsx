import { LinearProgress, Typography, TypographyProps } from '@mui/material'
import Box from '@mui/material/Box'
import { BoxProps, styled } from '@mui/system'
import { memo } from 'react'
import { MODAL_PADDING_IN_REM } from '../../style'
import ModalBase from './ModalBase'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const LABEL_PADDING_IN_REM = MODAL_PADDING_IN_REM * 5

const Row = styled(Box)<BoxProps>(() => ({
  padding: `${MODAL_PADDING_IN_REM}rem`,
  display: 'flex'
}))

const Emoji = styled(Typography)<TypographyProps>(() => ({
  flex: 0
}))

const Label = styled(Typography)<TypographyProps>(() => ({
  paddingLeft: `${LABEL_PADDING_IN_REM}rem`,
  flex: 1
}))

const Counter = styled(Typography)<TypographyProps>(() => ({
  flex: 1,
  textAlign: 'end'
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
        <Emoji>🔖</Emoji>
        <Label>Bookmarks</Label>
        <Counter>12</Counter>
      </Row>
      <Row>
        <Emoji>📁</Emoji>
        <Label>Folders</Label>
        <Counter>3</Counter>
      </Row>
      <Row>
        <Emoji>🟢</Emoji>
        <Label>Online</Label>
        <Counter>4</Counter>
      </Row>
      <Row>
        <Emoji>🟡</Emoji>
        <Label>Time out</Label>
        <Counter>4</Counter>
      </Row>
      <Row>
        <Emoji>🔴</Emoji>
        <Label>Offline</Label>
        <Counter>4</Counter>
      </Row>
      <Row>
        <Emoji>⏰</Emoji>
        <Label>Elapsed time</Label>
        <Counter>3s</Counter>
      </Row>
      <ProgressBarRow>
        <LinearProgress />
      </ProgressBarRow>
    </ModalBase>
  )
}

export default memo(ScanningModal)
