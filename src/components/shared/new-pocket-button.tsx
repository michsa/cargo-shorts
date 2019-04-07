import * as React from 'react'

import { IconButton } from './button'

export default ({ onClick }) => (
  <div className="new-pocket">
    <IconButton onClick={onClick} icon=":baby:">
      New Pocket
    </IconButton>
  </div>
)
