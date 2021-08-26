import styled from 'styled-components'

const SLOT_WIDTH = '48px'
const SLOT_HEIGHT = '48px'

export const Contianer = styled.div`
  display: flex;
  width: ${SLOT_WIDTH};
  height: ${SLOT_HEIGHT};
  background-color: #f1f2f4;
  justify-content: center;
  align-items: center;

  border: 1px solid #bbbbbb;
  &:hover {
    background-color: #e5eef0;
  }
  &.isActive {
    background-color: #fff0f3;
  }
  &.canDrop {
    background-color: #f7ffef;
  }
  &.isClosed {
    background-color: #cccccc;
  }
`
