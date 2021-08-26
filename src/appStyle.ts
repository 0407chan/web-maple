import styled from 'styled-components'

const HEADER_HEIGHT = 100
export const Contianer = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 20px 0px;
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

export const Button = styled.button`
  display: flex;
  width: fit-content;
  border: 1px solid #9a722e;
  border-radius: 5px;
  flex-direction: row;
  font-weight: bold;
  color: #fff8ed;
  padding: 4px 10px;
  cursor: pointer;
  background-color: #f4af38;

  &:hover {
    background-color: #ffc96b;
  }
  &.disabled {
    color: #948c7d;
    background-color: #635949;
    border: 1px solid #443f38;
    cursor: not-allowed;
  }
  &:active {
    background-color: #fec056;
  }
`

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
