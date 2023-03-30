import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  overflow-y: overlay;
  top: 0;
  border-radius: 5px;

  /* justify-content: center; */
  background-color: #eeeeeee7;
  gap: 4px;

  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: unset;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ababab;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #9b9b9b;
  }
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
