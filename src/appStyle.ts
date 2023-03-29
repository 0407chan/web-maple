import styled from 'styled-components'

const HEADER_HEIGHT = 100
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  height: ${HEADER_HEIGHT}px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  height: fit-content;
  font-size: 24px;
  font-weight: bold;
`
export const BoundWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`

export const Bound = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100%;

  &.prev-bound {
    background-color: #eeeeee;
  }
  &.new-bound {
    background-color: #f1f2f4;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`


export const NpcImage = styled.img`
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 0 0.2rem orange);
    /* drop-shadow(-1px 1px 0 rgba(0, 0, 0, 0.5))
      drop-shadow(-1px -1px 0 rgba(0, 0, 0, 0.5))
      drop-shadow(1px -1px 0 rgba(0, 0, 0, 0.5)); */
  }
`
