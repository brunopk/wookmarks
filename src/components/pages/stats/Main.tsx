import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material'
import { ICON_MARGIN_RIGHT_IN_REM } from '../../../style.ts'
import { Page } from '../../Page.tsx'

/**************************************************************************************************/
/*                                           CONSTANTS                                            */
/**************************************************************************************************/

const PADDING_IN_REM = 0.75

/**************************************************************************************************/
/*                                         SUB-COMPONENTS                                         */
/**************************************************************************************************/

const Emoji = styled(Typography)<TypographyProps>(() => ({
  flex: 0
}))

const Label = styled(Typography)<TypographyProps>(() => ({
  paddingLeft: `${ICON_MARGIN_RIGHT_IN_REM}rem`,
  flex: 1,
  textAlign: 'justify'
}))

const Counter = styled(Typography)<TypographyProps>(() => ({
  flex: 1,
  textAlign: 'end'
}))

const Row = styled(Box)<BoxProps>(() => ({
  padding: `${PADDING_IN_REM}rem`,
  display: 'flex'
}))

/**************************************************************************************************/
/*                                       EXPORTED COMPONENT                                       */
/**************************************************************************************************/

function Main() {
  return (
    <Page>
      <Box>
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
          <Emoji>📅</Emoji>
          <Label>Last scan</Label>
          <Counter>06/03/2024 14:00</Counter>
        </Row>
      </Box>
    </Page>
  )
}

export default Main
