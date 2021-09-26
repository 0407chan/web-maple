import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
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
  padding: 10px 0;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

export const Body = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffcc5f;
  padding: 10px 0;
`

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  padding: 10px 0;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px 10px 10px;
  /* background-color: #eeeeeee7; */
  justify-content: center;
`

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
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
`
