import {
  compose,
  concat,
  includes,
  join,
  lensIndex,
  map,
  merge,
  over,
  pickBy,
  replace,
  toLower,
  toPairs
} from 'ramda'
import styled from 'styled-components'

// --- createStyleFromProps --- //

type Pair<T> = [keyof T, T[keyof T]]

// const kebabToCamel = replace(/-([a-z])/g, compose(toUpper, last))
export const camelToKebab = replace(/([A-Z])/g, compose(concat('-'), toLower))

export const pairToStyle = <T>(pair: Pair<T>) =>
  compose<Pair<T>, Pair<T>, string>(
    join(': '),
    over(lensIndex(0), camelToKebab)
  )(pair)

export const createStyleCreatorFromAllowedProps = <
  T extends { [K: string]: unknown }
>(
  allowedProps: Array<keyof T>
) => <P extends object>(defaultProps: Partial<T>) =>
  compose<P, T, unknown, Pair<T>[], string[], string>(
    join(';'),
    map(pairToStyle),
    toPairs,
    merge<Partial<T>>(defaultProps),
    pickBy((v, k) => includes(k, allowedProps))
  )

export const stylify = <T extends { [K: string]: unknown }>(
  allowedProps: Array<keyof T>
) => (defaultProps: Partial<T> = {}) => x => styled(x)<T>`
  ${createStyleCreatorFromAllowedProps(allowedProps)(defaultProps)}
`

// --- flexbox --- //

type FlexboxProps = {
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch'
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
  display?: 'flex' | 'inline-flex'
  flex: string | number
  flexBasis?: string | number
  flexDirection?: 'column-reverse' | 'column' | 'row-reverse' | 'row'
  flexGrow?: string | number
  flexShrink?: string | number
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap'
  height?: string | number
  inline?: boolean
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  margin?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  marginTop?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  order?: number
  padding?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
  paddingTop?: string | number
  style?: object
  width?: string | number
}
export const flexboxKeys: Array<keyof FlexboxProps> = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'display',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'height',
  'inline',
  'justifyContent',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'order',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'style',
  'width'
]

const flexify = stylify<FlexboxProps>(flexboxKeys)

export const flexifyCentered = flexify({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
})

// export const FlexParent = flexify({ display: 'flex' })('div')
// export const FlexChild = flexify()('div')
// export const FlexCenter = flexifyCentered('div')

const createStyleFromProps = createStyleCreatorFromAllowedProps(flexboxKeys)

export const FlexParent = styled('div')<FlexboxProps>`
  ${createStyleFromProps<FlexboxProps>({ display: 'flex' })}
`

export const FlexCenter = styled('div')<FlexboxProps>`
  ${createStyleFromProps<FlexboxProps>({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })}
`

export const FlexChild = styled('div')<FlexboxProps>`
  ${createStyleFromProps<FlexboxProps>({})}
`
