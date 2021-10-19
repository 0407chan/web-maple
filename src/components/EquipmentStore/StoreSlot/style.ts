import styled from 'styled-components'

const SLOT_WIDTH = '48px'
const SLOT_HEIGHT = '48px'

export const Contianer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f1f2f4;
  justify-content: flex-start;
  align-items: flex-start;

  border: 1px solid #bbbbbb;
  cursor: pointer;
  &:hover {
    background-color: #e5eef0;
  }
`

export const ImageWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`
export const Image = styled.img`
  display: flex;
  padding: 5px;
  /* width: ${SLOT_WIDTH}; */
  /* height: ${SLOT_HEIGHT}; */
`
export const Horizontal = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

export const HighlightText = styled.span`
  background-color: #ffc60a;
  font-weight: bold;
`
