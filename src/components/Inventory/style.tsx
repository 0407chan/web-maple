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

export const InventoryHeader = styled.div`
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
export const InventoryBody = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  margin: 0 10px 10px 10px;
  border-radius: 5px;
  justify-content: center;
  background-color: #eeeeeee7;
`
export const InventoryFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 10px 10px 10px;
  /* background-color: #eeeeeee7; */
  justify-content: center;
`

export const InventoryButtonWrapper = styled.div`
  display: flex;
  padding: 20px 10px 0px 10px;
  flex-direction: row;
  border-bottom: 2px solid #ffc156;
`
export const InventoryButton = styled.button`
  display: flex;
  border-top: 1px solid #9a722e;
  border-right: 1px solid #9a722e;
  border-left: 1px solid #9a722e;
  border-bottom: unset;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex-direction: row;
  font-weight: bold;
  color: #fff8ed;
  padding: 4px 10px;
  cursor: pointer;
  background-color: #a0a0a0;

  &:hover {
    background-color: #b5b5b5;
  }

  &.isActive {
    background-color: #f4af38;

    &:hover {
      background-color: #ffc96b;
    }
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 250px;
  height: 360px;
  gap: 10px;
  border-radius: 5px;
  padding: 10px;
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
`
