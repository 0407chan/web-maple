import {
  Input as OriginalInput,
  InputNumber as OriginalInputNubmer,
  Radio
} from 'antd/lib'
import styled from 'styled-components'

export const Contianer = styled.div`
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
export const Block = styled.div<{ isLoading?: boolean }>`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 10px;

  &:after {
    content: '';
    top: 0;
    left: 0;
    z-index: 1;
    position: absolute;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    transition: display 1s ease;
    background-color: rgba(0, 0, 0, 0.3);
    ${(props) =>
      props.isLoading === true
        ? {
            display: 'block'
          }
        : {
            display: 'none'
          }}
  }
`
export const Input = styled(OriginalInput)`
  /* width: 150px; */
  border-radius: 5px;
  border: unset;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }

  &[disabled] {
    background-color: #dddddd;
  }
`
export const InputNumber = styled(OriginalInputNubmer)`
  /* width: 150px; */
  .ant-input-number-input {
    padding-left: 0;
  }
  border-radius: 5px;
  border: unset;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }

  &[disabled] {
    background-color: #dddddd;
  }
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
  gap: 6px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Text = styled.span`
  width: 60px;
  font-weight: bold;
`

export const RadioGroup = styled(Radio.Group)``
