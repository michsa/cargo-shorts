import * as React from 'react'

import { IconButton } from './button'

const NewPocketButton = ({ onClick }: { onClick: () => void }) => (
  <div className="new-pocket">
    <IconButton onClick={onClick} icon="🐣">
      New Pocket
    </IconButton>
  </div>
)

export default NewPocketButton

// 👶
// 🐣
// ✨
// 🌟
// 🥚
