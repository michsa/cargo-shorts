import Color from 'color'

import styled from '../../styled'
import Flex from '../shared/flex'

const PocketDetails = styled(Flex)<{ color: string }>(({ color, theme }) => ({
  backgroundColor: color,
  color:
    Color(color).isDark() !== theme.isDark
      ? theme.colors.altBackground
      : theme.colors.text
}))
export default PocketDetails
