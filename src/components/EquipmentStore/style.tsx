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
