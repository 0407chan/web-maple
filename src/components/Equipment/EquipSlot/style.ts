import styled from 'styled-components'

const SLOT_WIDTH = '48px'
const SLOT_HEIGHT = '48px'

export const Container = styled.div`
  display: flex;
  position: relative;
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

export const SlotName = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 10px;
  position: absolute;
  color: #797979;
  top: 0;
`
