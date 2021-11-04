import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* cursor: pointer; */
  width: 100%;
  height: 100%;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

export const ItemImage = styled.img<{ isDestroyed?: boolean }>`
  ${(props) =>
    props.isDestroyed && {
      opacity: 0.6,
      filter: 'grayscale(95%)'
    }}
`
