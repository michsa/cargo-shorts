/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'

const PocketCount = ({ count }: { count: number }) => (
  <div
    className="pocket-count"
    css={theme => ({
      backgroundColor: Color(theme.colors.altBackground).alpha(0.65).string(),
      boxShadow: `0 0 0 1px ${Color(theme.colors.altBackground)
        .alpha(0.15)
        .string()}, 0 0 3px ${Color(theme.colors.altBackground)
        .alpha(0.65)
        .string()}`,
      color: theme.colors.text,
      borderRadius: 2,
      // padding: '0.2em 0.6em',
      padding: '1px 6px',
      margin: '0 8px',
      fontSize: '0.9em',
      verticalAlign: 'middle',
      lineHeight: 'normal',
    })}
  >
    {count}
  </div>
)

export default PocketCount
