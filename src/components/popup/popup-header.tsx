import styled from '../../styled-components'

const PopupHeader = styled('header')`
text-align: center;
margin: 10px 0;
:after {
  content: "";
  display: block;
  height: 2px;
  width: 90%;
  border-radius: 2px;
  margin: 10px auto 0;
  background-color: ${props => props.theme.secondaryColor};
}
`
export default PopupHeader
