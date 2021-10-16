import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border-radius: 5px;
  justify-content: center;
  background-color: #eeeeeee7;
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
  align-items: flex-start;
  width: 260px;
  height: 356px;
  gap: 10px;
  border-radius: 5px;
  padding: 10px;
`

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
