import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  overflow-y: auto;
  top: 0;
  border-radius: 5px;

  /* justify-content: center; */
  background-color: #eeeeeee7;
  gap: 4px;
`

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const Vertical = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const InventoryButtonWrapper = styled.div`
  display: flex;
  padding: 10px 10px 0px 10px;
  flex-direction: row;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #eeeeeee7;
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
