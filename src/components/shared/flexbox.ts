import { compose, concat, join, lensIndex, map, merge, over, replace, toLower, toPairs } from 'ramda'
import styled, { AnyStyledComponent } from 'styled-components'
import { FunctionComponent } from 'react';

// --- createStyleFromProps --- //

type Pair<T> = [string, T[keyof T]]

// const kebabToCamel = replace(/-([a-z])/g, compose(toUpper, last))
const camelToKebab = replace(/([A-Z])/g, compose(concat('-'), toLower))

const pairToStyle = <T>(pair: Pair<T>) =>
  compose<Pair<T>, Pair<T>, string>(
    join(': '), over(lensIndex(0), camelToKebab)
  )(pair)

const createStyleFromProps = <T>(defaults: T) => (props: T) => compose<
  T, { [K in keyof T]: T[K] }, Pair<T>[], string[], string
>(
  join('; '),
  map(pairToStyle),
  toPairs,
  merge<T>(defaults)
)

// --- flexbox --- //

type FlexboxProps = {
  alignContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch',
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch',
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch',
  display?: 'flex' | 'inline-flex',
  flex?: string | number,
  flexBasis?: string | number,
  flexDirection?: 'column-reverse' | 'column' | 'row-reverse' | 'row',
  flexGrow?: string | number,
  flexShrink?: string | number,
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap',
  height?: string | number,
  inline?: boolean,
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly',
  margin?: string | number,
  marginBottom?: string | number,
  marginLeft?: string | number,
  marginRight?: string | number,
  marginTop?: string | number,
  maxHeight?: string | number,
  maxWidth?: string | number,
  minHeight?: string | number,
  minWidth?: string | number,
  order?: number,
  padding?: string | number,
  paddingBottom?: string | number,
  paddingLeft?: string | number,
  paddingRight?: string | number,
  paddingTop?: string | number,
  style?: object,
  width?: string | number
}

const defaultProps: FlexboxProps = { display: 'flex' }


export const flexify = <T>(
  x: FunctionComponent<T>,
  isParent: boolean = false
) => styled(x) <FlexboxProps>`
  ${createStyleFromProps(isParent ? defaultProps : {})}
`

export const FlexParent = styled('div') <FlexboxProps>`
  ${createStyleFromProps(defaultProps)}
`

export const FlexChild = styled('div') <FlexboxProps>`
  ${createStyleFromProps({})}
`
