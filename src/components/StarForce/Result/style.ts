import { Input as OriginalInput } from 'antd/lib'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 250px;
`

export const Title = styled.div`
  margin-left: 2px;
  font-weight: bold;
  color: #eeeeee;
`
export const Block = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 8px;
`

export const Horizontal = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Vertical = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Text = styled.span`
  font-size: 18px;
  font-weight: bold;
`

export const Input = styled(OriginalInput)`
  /* width: 150px; */
  text-align: right;
  border-radius: 5px;
  border: unset;
  padding: 5px 10px;
  cursor: unset;
  &:focus {
    outline: none;
  }

  &[disabled] {
    background-color: #dddddd;
  }

  &input[type='text'] {
    text-align: right;
  }
  &input:not([type='range']) {
    text-align: right;
  }

  .ant-input {
    text-align: right;
  }
`

export const ItemImage = styled.img<{ isDestroyed?: boolean }>`
  ${(props) =>
    props.isDestroyed && {
      opacity: 0.6,
      filter: 'grayscale(95%) drop-shadow(0 0 0.1rem black)'
    }}
`
