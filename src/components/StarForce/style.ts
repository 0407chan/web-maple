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
  /* height: 190px; */
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

const glowing = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
`
export const RateBlock = styled.div<{ isChance?: boolean; disabled?: boolean }>`
  display: flex;
  width: 100%;
  padding: 5px 0;
  background-color: #eeeeee;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    animation: ${glowing} 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    ${(props) =>
      props.isChance && {
        opacity: 1
      }}
  }

  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #eeeeeee8;
    left: 0;
    top: 0;
    border-radius: 5px;

    ${(props) =>
      props.disabled && {
        background: '#979797'
      }}
  }
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
