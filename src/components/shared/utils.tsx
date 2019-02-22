import styled from '../../styled-components'

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const Truncated = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const PopupHeader = styled('header')`
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

  h1 {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.2em;
    font-size: 11pt;
    color: ${props => props.theme.primaryColor};
    margin: 0;
  }
`
