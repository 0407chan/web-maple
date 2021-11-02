import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  gap: 10px;
`

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 190px;
  width: 270px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(120, 120, 120, 0.95);
  border-radius: 5px;
  padding: 10px;
  color: #e1e2e3;
`

export const Horizontal = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Vertical = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
