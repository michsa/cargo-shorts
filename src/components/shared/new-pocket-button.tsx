import { Emoji } from 'emoji-mart'
import * as React from 'react'

import { Button } from './utils'

export default ({ onClick }) => (
  <div className="new-pocket">
    <Button onClick={onClick}>
      <Emoji emoji=":baby:" native={true} size={14}/>
      <div style={{width: "4px"}} />
      New Pocket
    </Button>
  </div>
)
