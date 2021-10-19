import styled from 'styled-components'

export const Contianer = styled.div`
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
