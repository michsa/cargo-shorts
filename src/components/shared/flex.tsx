import { StyledOptions} from '@emotion/styled'
import { pick } from 'ramda'

import styled from '../../styled'

type FlexProps = StyledOptions & {
  alignItems?: string,
  flex?: number | string,
  center?: boolean
  alignContent?: string
  justifyContent?: string
  wrap?: boolean
  column?: boolean
  inline?: boolean
  gap?: string | number
  as?: React.ReactNode | string,
  children?: React.ReactNode
}

const Flex = styled.div<FlexProps>(
  pick(['alignItems', 'justifyContent', 'alignContent', 'flex']),
  ({ center }) => center && { justifyContent: 'center', alignItems: 'center' },
  ({ inline, wrap, gap = 0, column }) => ({
    display: `${inline ? 'inline-' : ''}flex`,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    flexDirection: column ? 'column' : 'row',
    ...(!wrap && { '& > * + *': { [`margin${column ? 'Top' : 'Left'}`]: gap } })
  })
)

export default Flex
