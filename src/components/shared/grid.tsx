import styled from '@emotion/styled'
import { map, o, is, join, replace, when } from 'ramda'

const quote = replace(/^|$/g, '"')
const formatAreas = o(join(' '), map(quote))

const repeatNumber = when(is(Number), x => `repeat(${x}, 1fr)`)

export interface GridProps {
  columns?: string | number
  rows?: string | number
  autoRows?: string | number
  areas?: string[]
  gap?: string | number
  rowGap?: string | number
  columnGap?: string | number
  placeContent?: string
  placeItems?: string
  inline?: boolean
}

const Grid = styled.div(
  ({
    columns,
    rows,
    autoRows,
    areas,
    gap,
    rowGap,
    columnGap,
    placeContent,
    placeItems,
    inline = false
  }: GridProps) => ({
    display: `${inline ? 'inline-' : ''}grid`,
    gridTemplateColumns: repeatNumber(columns),
    gridTemplateRows: repeatNumber(rows),
    gridAutoRows: autoRows,
    gridTemplateAreas: areas && formatAreas(areas),
    gridRowGap: rowGap ?? gap,
    gridColumnGap: columnGap ?? gap,
    placeContent,
    placeItems
  })
)

export interface GridItemProps {
  column?: number
  row?: number
  area?: string
  width?: number
  height?: number
  place?: string
}

export const GridItem = styled.div(
  ({
    column,
    row,
    area,
    width,
    height,
    place,
  }: GridItemProps) => ({
    gridColumn: column,
    ...(width && { gridColumnEnd: `span ${width}` }),
    gridRow: row,
    ...(height && { gridRowEnd: `span ${height}` }),
    ...(area && { gridArea: area }),
    placeSelf: place,
  })
)

export default Grid
