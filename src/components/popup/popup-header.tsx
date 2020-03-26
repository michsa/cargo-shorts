import React from 'react'
import { Box } from 'reflexbox'

// import styled from "../../styled"

// const PopupHeader = styled.header(props => ({
//   textAlign: 'center',
//   padding: '12px 0',
//   backgroundColor: props.theme.colors.secondary,
//   borderBottom: '2px solid ${props => props.theme.colors.primary}'
// }))

const PopupHeader = props => <Box bg="primaryColor" py={12} {...props} />

export default PopupHeader
