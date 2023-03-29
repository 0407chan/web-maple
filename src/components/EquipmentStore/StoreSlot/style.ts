import styled from 'styled-components'

const SLOT_WIDTH = '48px'
const SLOT_HEIGHT = '48px'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 52px;
  background-color: #f1f2f4;
  justify-content: flex-start;
  align-items: flex-start;

  border: 1px solid #bbbbbb;
  /* cursor: pointer; */
  &:hover {
    background-color: #e5eef0;
  }
`

export const ImageWrapper = styled.div`
  display: flex;
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  justify-content: center;
  align-items: center;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`
export const Image = styled.img`
  display: flex;
  padding: 5px;
  /* width: ${SLOT_WIDTH}; */
  /* height: ${SLOT_HEIGHT}; */
`
