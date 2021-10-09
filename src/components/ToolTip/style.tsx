import IMAGE from '@/utils/images'
import styled from 'styled-components'

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  justify-content: center;
`

export const Contianer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #161616d0;
  border-radius: 5px;
  border: 1px solid #eeeeee 1px solid #747474;
  position: absolute;
  z-index: 15;
  width: 330px;

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

type SectionBlockType = {
  justifyContent: 'center' | 'flex-start' | 'flext-end'
  flexDirection: 'row' | 'column'
  alignItems: 'center' | 'flex-start' | 'flext-end'
}
export const SectionBlock = styled.div<SectionBlockType>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding: 0px 20px;
`

export const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 30px 10px 30px;
`

export const StarBundleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 3px;
`

export const ItemNameWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ItemName = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: #eeeeee;
  align-items: center;
`
export const ItemPotential = styled.div`
  display: flex;
  justify-content: center;
  color: #eeeeee;
  font-size: 14px;
  align-items: center;
`

export const DotLine = styled.div`
  display: flex;
  border-top: 1px dashed #5c5c5c;
  margin: 20px 0px;
`

export const ImageWrapper = styled.div`
  display: flex;
  background-image: linear-gradient(180deg, #8f8f8f, #d8d8d8);
  border: 3px double #888888;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 60px;
  min-height: 60px;
  max-width: 60px;
  max-height: 60px;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const AttackIncreaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
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

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #f2f2f2;
  font-size: 14px;
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
`

export const Status = styled.div`
  color: #f2f2f2;
`
