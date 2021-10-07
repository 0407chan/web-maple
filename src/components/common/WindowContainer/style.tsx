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
  padding: 10px 0px 15px 0px;

  &.handle {
    cursor: grab;
  }
  &:active.handle {
    cursor: grabbing;
  }
`
export const Body = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 30px);
  height: 100%;
  padding: 15px;
  padding-top: 0px;
`

export const Content = styled.div`
  display: flex;
  width: 100%;
  border-radius: 5px;
  background-color: #eeeeeee7;
`

export const Footer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  align-items: center;
  justify-content: center;
`

export const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 10px;
  right: 15px;
  font-weight: bold;
  width: fit-content;
  align-items: center;
  border: unset;
  background-color: unset;
  justify-content: center;
  color: #eeeeee;

  &:hover {
    cursor: pointer;
    color: #ffd884;
  }
`
