// /** @jsx jsx */
// import { jsx } from '@emotion/core'
// import { CustomPicker } from 'react-color'
// import { EditableInput, Hue } from 'react-color/lib/components/common'

// export const MyPicker = ({ hex, hsl, onChange }: any) => (
//   <div>
//     <div
//       css={{
//         height: 10,
//         position: 'relative',
//         marginBottom: 10
//       }}
//     >
//       <Hue hsl={hsl} onChange={onChange} />
//     </div>

//     <div style={{ display: 'flex' }}>
//       <EditableInput
//         css={{
//           input: {
//             height: 34,
//             border: `1px solid ${hex}`,
//             paddingLeft: 10
//           }
//         }}
//         value={hex}
//         onChange={onChange}
//       />
//       <div
//         css={{
//           width: 54,
//           height: 38,
//           background: hex
//         }}
//       />
//     </div>
//   </div>
// )

// export default CustomPicker(MyPicker)
