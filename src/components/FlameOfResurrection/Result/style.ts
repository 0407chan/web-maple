import styled from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 10px 20px;
`

export const Horizontal = styled.div`
  display: flex;
  gap: 30px;
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

export const Text = styled.span`
  font-weight: bold;
`
