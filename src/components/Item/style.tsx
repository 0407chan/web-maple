import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* cursor: pointer; */
  width: 40px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`
