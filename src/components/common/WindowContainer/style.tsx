import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  width: 300px;
  height: fit-content;
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffcc5f;
  padding-top: 10px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`
export const Body = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 40px);
  height: 100%;
  border-radius: 5px;
  padding: 10px 20px 20px 20px;
`

export const Content = styled.div`
  display: flex;
  width: 100%;
  background-color: #eeeeeee7;
`

export const Footer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`
