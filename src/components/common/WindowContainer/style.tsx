import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(60, 60, 60, 0.93);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  border: 1px solid rgba(169, 169, 169, 0.9);
  padding: 15px;
  padding-top: 0;
  gap: 10px;
  width: fit-content;
  height: fit-content;
`

export const Header = styled.div`
  display: flex;
  width: calc(100% + 30px);
  font-size: 12px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffcc5f;
  padding-top: 10px;
  padding-bottom: 5px;
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
  width: 100%;
  height: 100%;
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
  align-items: center;
  justify-content: center;
`

export const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 7px;
  right: 10px;
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
