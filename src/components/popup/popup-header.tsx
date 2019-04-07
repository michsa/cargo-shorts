import styled from '../../styled-components'

const PopupHeader = styled('header')`
text-align: center;
padding: 12px 0;
background-color: ${props => props.theme.secondaryColor};
border-bottom: 2px solid ${props => props.theme.primaryColor};
`

export default PopupHeader
