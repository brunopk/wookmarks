import { Typography, TypographyProps } from '@mui/material'
import Box from '@mui/material/Box'
import { BoxProps, styled } from '@mui/system'
import { memo, useEffect, useState } from 'react'
import useBookmarkScanning from '../../hooks/useBookmarkScanning'
import { MODAL_PADDING_IN_REM } from '../../style'
import ModalBase from './ModalBase'
import PrimaryButton from './PrimaryButton'
import ProgressBar from './ScanningModalProgressBar'
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
  const { stage, scanningResult, elapsedTime, startScanning } = useBookmarkScanning()

  const [scanStarted, setScanStarted] = useState(false)

  const totalBookmarks =
    typeof scanningResult?.counters.totalBookmarks !== 'undefined'
      ? scanningResult?.counters.totalBookmarks
      : 0

  const online =
    typeof scanningResult?.counters.online !== 'undefined' ? scanningResult?.counters.online : 0

  const offline =
    typeof scanningResult?.counters.offline !== 'undefined' ? scanningResult?.counters.offline : 0

  const timeOut =
    typeof scanningResult?.counters.timeOut !== 'undefined' ? scanningResult?.counters.timeOut : 0

  const handleSecondaryButtonClick = () => {
    onClose()
  }

  const handlePrimaryButtonClick = () => {
    setScanStarted(true)
    startScanning()
  }

  const handleModalClose = handleSecondaryButtonClick

  const normalizeProgress = () => {
    if (typeof scanningResult === 'undefined') return 0
    const value = offline + online + timeOut
    return (value * 100) / scanningResult.counters.totalBookmarks
  }

  const formatElapsedTime = (ms: number) => {
    let seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    seconds %= 60

    return (minutes ? `${minutes}m` : '') + (seconds ? `${seconds}s` : '') || '0s'
  }

  useEffect(() => {
    if (stage === 'FINISHING') {
      setScanStarted(false)
    }
  }, [stage])

  const primaryActionButton = <PrimaryButton onClick={handlePrimaryButtonClick} text="START" />

  const secondaryActionButton = <SecondaryButton onClick={handleSecondaryButtonClick} text="STOP" />

  const modalBaseAttributes: Omit<ModalBaseProps, 'children'> = {
    title: 'Bookmark scanning',
    open,
    primaryActionButton,
    secondaryActionButton,
    onClose: handleModalClose
  }

  const progressBarAttributes: UI.Scanning.ModalProgressBarProps = {
    show: scanStarted,
    showValue: stage === 'PROBING_URLS',
    value: normalizeProgress()
  }

  return (
    <ModalBase {...modalBaseAttributes}>
      <Row>
        <Emoji>🔖</Emoji>
        <Label>Bookmarks</Label>
        <Counter>{totalBookmarks}</Counter>
      </Row>
      <Row>
        <Emoji>🟢</Emoji>
        <Label>Online</Label>
        <Counter>{online}</Counter>
      </Row>
      <Row>
        <Emoji>🟡</Emoji>
        <Label>Time out</Label>
        <Counter>{timeOut}</Counter>
      </Row>
      <Row>
        <Emoji>🔴</Emoji>
        <Label>Offline</Label>
        <Counter>{offline}</Counter>
      </Row>
      <Row>
        <Emoji>⏰</Emoji>
        <Label>Elapsed time</Label>
        <Counter>{formatElapsedTime(elapsedTime)}</Counter>
      </Row>
      <ProgressBarRow>
        <ProgressBar {...progressBarAttributes} />
      </ProgressBarRow>
    </ModalBase>
  )
}

export default memo(ScanningModal)
