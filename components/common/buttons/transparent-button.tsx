import styled from 'styled-components'

export const TransparentButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  font-size: 20px;
  padding: 0;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
  height: fit-content;
  width: 100%;
  color: ${({ theme }) => theme.palette.colors.robinsEggBlue};
`
