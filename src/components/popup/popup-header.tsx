import styled from '../../styled-components'

const PopupHeader = styled('header')`
text-align: center;
padding: 16px 0;
background-color: ${props => props.theme.secondaryColor};
border-bottom: 2px solid ${props => props.theme.primaryColor};
`
/*
:after {
  content: "";
  display: block;
  height: 2px;
  width: 90%;
  border-radius: 2px;
  margin: 10px auto 0;
  background-color: ${props => props.theme.secondaryColor};
}
*/

export default PopupHeader
