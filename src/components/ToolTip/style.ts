import IMAGE from '@/utils/images'
import styled from 'styled-components'

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  justify-content: center;
`

export const AttackIncreaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`
export const AttackIncreaseLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  color: #eeeeee;
`
export const AttackIncrease = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  color: #f1f1f1;
`

export const Contianer = styled.div`
  position: absolute;
  z-index: 10;
  width: 261px;

  .name {
    color: white;
  }

  .tooltip-frame-top-img {
    background-image: url(${IMAGE.tooltip.tooltip_flame_top});
    width: 261px;
    height: 13px;
  }

  .tooltip-frame-line-img {
    background-image: url(${IMAGE.tooltip.tooltip_flame_line});
    width: 261px;
  }

  .tooltip-frame-bottom-img {
    background-image: url(${IMAGE.tooltip.tooltip_flame_bottum});
    width: 261px;
    height: 13px;
  }

  .tooltip-frame-dotline-img {
    background-image: url(${IMAGE.tooltip.tooltip_flame_dotline});
    width: 261px;
    height: 2px;
  }

  .tooltip-image {
    display: flex;
    width: calc(100% - 20px);
    padding: 10px;
  }
  .attack-increase {
    color: white;
  }

  .item-icon-cover {
    position: absolute;
  }

  .tooltip-item-img {
    position: absolute;
    width: 65px;
    // top: 50%;
    // left: 50%;
  }

  .tooltip-item-img-content {
    position: absolute;
    top: 4px;
    left: 4px;
  }

  .item-icon-base {
    position: relative;
  }

  .tooltip-header {
    display: grid;
    .tooltip-star {
      justify-self: center;
      align-self: center;
      width: 175px;
    }
    .tooltip-name {
      color: white;
      font-weight: bold;
      margin: 5px;
    }
    .tooltip-grade {
      color: white;
      font-size: 10px;
      margin-bottom: 10px;
    }
  }

  .tooltip-detail-wrapper {
    display: grid;
    justify-items: start;
    padding: 10px;
    padding-left: 13px;
    padding-right: 13px;
    color: white;
    font-size: 10px;
  }

  .add-color {
    color: skyblue;
  }
  .chu-color {
    color: greenyellow;
  }
  .yellow-color {
    color: #ffc13c;
  }
`
