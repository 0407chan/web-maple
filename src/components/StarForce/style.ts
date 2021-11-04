import styled, { css, keyframes } from 'styled-components'

export const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  gap: 10px;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
export const StarImage = styled.img<{ isLoading?: boolean }>`
  animation: ${(props) =>
    props.isLoading
      ? css`
          ${spin} 1s linear infinite
        `
      : ''};
`

export const Title = styled.div`
  font-weight: bold;
  color: #eeeeee;
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
  width: 100%;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StarWrapper = styled.div`
  display: flex;
  width: 270px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 30px;
  margin-bottom: 10px;
`

export const RateBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 0;
  background-color: #eeeeee;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
`

export const RateLabel = styled.span<{
  rateType?: 'SUCCESS' | 'FAIL' | 'DESTROY'
}>`
  font-weight: bold;
  font-size: 16px;
  ${(props) => {
    if (props.rateType === 'SUCCESS') {
      return {
        color: '#05c13a',
        fontSize: 14
      }
    } else if (props.rateType === 'FAIL') {
      return {
        color: '#ff4747',
        fontSize: 14
      }
    } else if (props.rateType === 'DESTROY') {
      return {
        color: '#595959',
        fontSize: 14
      }
    } else {
      return {}
    }
  }}
`
