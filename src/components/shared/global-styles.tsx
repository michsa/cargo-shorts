import { Global } from '@emotion/core'
import React from 'react'

const GlobalStyles = () => (
  <Global
    styles={theme => ({
      '.emoji-mart-emoji span': {
        filter: `
  drop-shadow(0 -1px ${theme.colors.text}99)
  drop-shadow(-1px 1px ${theme.colors.text}99)
  drop-shadow(1px 0.5px ${theme.colors.text}CC)`
      },
      'html, body': {
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        fontFamily: 'Nunito, sans-serif',
        fontSize: '10pt',
        fontWeight: 500,
        color: theme.colors.text
      }
    })}
  />
)
export default GlobalStyles
