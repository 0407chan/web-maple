import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  width: 300px;
  height: 500px;
  cursor: pointer;
`

export const InventoryHeader = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffcc5f;
  padding: 10px;
`
export const ItemListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 350px;
  gap: 10px;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: #eeeeeee7;
`
