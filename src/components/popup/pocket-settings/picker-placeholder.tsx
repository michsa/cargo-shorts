/** @jsx jsx */
import { jsx } from '@emotion/core'

const PickerPlaceholder = () => (
  <div css={{ position: 'relative', width: '100%' }}>
    <div css={{ position: 'absolute', top: '32%', left: '12%' }}>
      pick an icon
    </div>
    <div css={{ position: 'absolute', top: '8%', left: '24%' }}>
      give it a name
    </div>
    <div css={{ position: 'absolute', top: '28%', right: '12%' }}>
      choose a color
    </div>
  </div>
)

export default PickerPlaceholder
