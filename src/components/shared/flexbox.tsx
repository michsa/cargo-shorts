import { compose, concat, isNil, last, over, prop, reduce, replace, toLower, toPairs, toUpper, unless } from 'ramda'
import React from 'react'
import styled from 'styled-components'

const kebabToCamel = replace(/-([a-z])/g, compose(toUpper, last))
const camelToKebab = replace(/([A-Z])/g, compose(concat('-'), toLower))

// The number `0` with no unit is a valid CSS length, see:
//   https://www.w3.org/TR/CSS2/syndata.html#length-units
// Though it might be inappropriate/avoidable in certain contexts, if it is
// valid CSS, we should allow it.
// const isTruthyOrZero = <T extends unknown>(value: T) => value || value === 0

type FlexboxProps = {
  alignContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch',
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch',
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch',
  children?: React.ReactNode,
  display?: 'flex' | 'inline-flex',
  element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'header' | 'main' | 'nav' | 'section',
  htmlElement?: React.ReactNode,
  flex?: string | number,
  flexBasis?: string | number,
  flexDirection?: 'column-reverse' | 'column' | 'row-reverse' | 'row',
  flexGrow?: string | number,
  flexShrink?: string | number,
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap',
  height?: string | number,
  inline?: boolean,
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between',
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

const createFlexbox = ({
  alignContent, alignItems, alignSelf,
  children,
  display = 'flex',
  element = 'div',
  flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap,
  height,
  htmlElement,
  justifyContent,
  margin, marginBottom, marginLeft, marginRight, marginTop,
  maxHeight, maxWidth, minHeight, minWidth,
  order,
  padding, paddingBottom, paddingLeft, paddingRight, paddingTop,
  width,
  ...props
}: FlexboxProps) => React.createElement(element, props, children)

/*

const addStyle = (
  key: keyof FlexboxProps,
  styleName: string,
  defaultValue: string = '') =>
  (props: FlexboxProps) =>
    isTruthyOrZero(props[key])
      ? `${styleName}: ${props[key]}`
      : defaultValue




// styleName -> props -> string
const createStyle = <K extends keyof FlexboxProps>(styleName: string) =>
  compose<FlexboxProps, PropValue<K> | undefined, string>(
    unless<PropValue<K> | undefined, string>(isNil, formatStyle(styleName)),
    prop<string, PropValue<K> | undefined>(kebabToCamel(styleName))
  )
  */

type PropValue<T extends keyof FlexboxProps> = FlexboxProps[T]


const formatStyle = (styleName: string) => compose(
  concat(`${styleName}: `), toString
)

const createStyleFromProps = (props: FlexboxProps) => compose(
  reduce(
    (acc, x) => concat(
      `${acc}; `, compose(
        join(': '),
        over(lensIndex(0), camelToKebab)
      )(x)
    ),
    ''
  ),
  toPairs,
)

// {[PropKey]: PropValue} -> 

const Flexbox = styled(createFlexbox)`
  ${createStyleFromProps}
`

/*
  ${props => (props.alignItems ? `align-items: ${props.alignItems};` : '')}
  ${props => (props.display ? `display: ${props.display};` : '')}
  ${props => (isTruthyOrZero(props.flex) ? `flex: ${props.flex};` : '')}
  ${props => (isTruthyOrZero(props.flexBasis) ? `flex-basis: ${props.flexBasis};` : '')}
  ${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : '')}
  ${props => (isTruthyOrZero(props.flexGrow) ? `flex-grow: ${props.flexGrow};` : '')}
  ${props => (isTruthyOrZero(props.flexShrink) ? `flex-shrink: ${props.flexShrink};` : '')}
  ${props => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : '')}
  ${props => (isTruthyOrZero(props.height) ? `height: ${props.height};` : '')}
  ${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : '')}
  ${props => (isTruthyOrZero(props.margin) ? `margin: ${props.margin};` : '')}
  ${props => (isTruthyOrZero(props.marginBottom) ? `margin-bottom: ${props.marginBottom};` : '')}
  ${props => (isTruthyOrZero(props.marginLeft) ? `margin-left: ${props.marginLeft};` : '')}
  ${props => (isTruthyOrZero(props.marginRight) ? `margin-right: ${props.marginRight};` : '')}
  ${props => (isTruthyOrZero(props.marginTop) ? `margin-top: ${props.marginTop};` : '')}
  ${props => (isTruthyOrZero(props.maxHeight) ? `max-height: ${props.maxHeight};` : '')}
  ${props => (isTruthyOrZero(props.maxWidth) ? `max-width: ${props.maxWidth};` : '')}
  ${props => (isTruthyOrZero(props.minHeight) ? `min-height: ${props.minHeight};` : '')}
  ${props => (isTruthyOrZero(props.minWidth) ? `min-width: ${props.minWidth};` : '')}
  ${props => (isTruthyOrZero(props.order) ? `order: ${props.order};` : '')}
  ${props => (isTruthyOrZero(props.padding) ? `padding: ${props.padding};` : '')}
  ${props => (isTruthyOrZero(props.paddingBottom) ? `padding-bottom: ${props.paddingBottom};` : '')}
  ${props => (isTruthyOrZero(props.paddingLeft) ? `padding-left: ${props.paddingLeft};` : '')}
  ${props => (isTruthyOrZero(props.paddingRight) ? `padding-right: ${props.paddingRight};` : '')}
  ${props => (isTruthyOrZero(props.paddingTop) ? `padding-top: ${props.paddingTop};` : '')}
  ${props => (isTruthyOrZero(props.width) ? `width: ${props.width};` : '')}
])
*/

export default Flexbox
