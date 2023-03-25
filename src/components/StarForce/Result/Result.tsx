import MapleButton from 'components/common/MapleButton'
import WindowContainer from 'components/common/WindowContainer'
import React from 'react'
import { ControlPosition } from 'react-draggable'
import { EquipItemType } from 'types/inventory'
import { StarForceResult, StarForceSetting } from 'types/star-force'
import { numberUnit } from 'utils/number/numberUnit'
import { numberWithCommas } from 'utils/number/numberWithCommas'
import * as S from './style'

// 2048716 강환불 Powerful Rebirth Flame
// 2048717 영환불 Eternal Rebirth Flame
const WonImage = `${import.meta.env.PUBLIC_URL}/images/money/won.png`

type Props = {
  item: EquipItemType | undefined
  result: Map<string, StarForceResult>
  setResult: React.Dispatch<React.SetStateAction<Map<string, StarForceResult>>>
  position: ControlPosition
  starForceSetting: StarForceSetting
}
const Result: React.FC<Props> = ({
  item,
  result,
  setResult,
  position,
  starForceSetting
}) => {
  const initItemStatusSetting = () => {
    if (item === undefined) return
    const res = result.get(item.id)
    if (res) {
      result.set(item.id, { ...res, cost: 0, destroyed: 0 })
    }
    setResult(result)
  }

  const getCost = () => {
    if (item === undefined) return 0
    const starResult = result.get(item.id)
    if (starResult === undefined) return 0

    return starResult.cost
  }
  const getDestroy = () => {
    if (item === undefined) return 0
    const starResult = result.get(item.id)
    if (starResult === undefined) return 0

    return starResult.destroyed
  }

  const getDestoryCost = () => {
    if (item === undefined) return 0
    const starResult = result.get(item.id)
    if (starResult === undefined) return 0

    return starResult.destroyed * (starForceSetting.itemCost ?? 0)
  }

  const getTotalCost = () => {
    return getCost() + getDestoryCost()
  }
  // const totalCost = () => {
  //   return calcCost('ETERNAL') + calcCost('POWERFUL')
  // }

  const mesoToKRW = () => {
    return Math.floor(
      (getTotalCost() / 100000000) * (starForceSetting.exchangeRate || 0)
    )
  }
  return (
    <WindowContainer
      windowType="EquipmentEnchant"
      hideCloseButton
      title="RESULT"
      position={{ ...position, x: position.x + 300 + 10 }}
      canDrag={false}
    >
      <S.Vertical>
        <S.Contianer>
          <S.Horizontal>
            <S.Title>터진 횟수</S.Title>
            <MapleButton size="small" onClick={initItemStatusSetting}>
              초기화
            </MapleButton>
          </S.Horizontal>
          <S.Horizontal>
            <S.Block>
              <S.Horizontal>
                <S.Text>
                  {item && (
                    <S.ItemImage
                      isDestroyed={true}
                      src={item.image}
                      alt="powerImage"
                    />
                  )}
                </S.Text>
                <S.Input
                  readOnly
                  suffix="펑"
                  value={numberWithCommas(getDestroy())}
                />
              </S.Horizontal>
            </S.Block>
          </S.Horizontal>
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Horizontal>
            <S.Title>누적 메소</S.Title>
          </S.Horizontal>
          <S.Block>
            <S.Horizontal>
              <S.Text>
                <img
                  src={`https://maplestory.io/api/${
                    import.meta.env.REACT_APP_REGION
                  }/${import.meta.env.REACT_APP_VERSION}/item/2438119/icon`}
                  alt="powerImage"
                />
              </S.Text>
              <S.Input readOnly value={numberWithCommas(getTotalCost())} />
            </S.Horizontal>
          </S.Block>
          <S.Horizontal style={{ justifyContent: 'flex-end' }}>
            <S.Title>{numberUnit(getTotalCost())} 메소</S.Title>
          </S.Horizontal>
        </S.Contianer>
        <S.Contianer style={{ marginTop: -10 }}>
          <S.Horizontal>
            <S.Title>현금 치환</S.Title>
          </S.Horizontal>
          <S.Block>
            <S.Horizontal>
              <S.Text>
                <img width={30} src={WonImage} alt="KRW" />
              </S.Text>
              <S.Input readOnly value={numberWithCommas(mesoToKRW())} />
            </S.Horizontal>
          </S.Block>
          <S.Horizontal style={{ justifyContent: 'flex-end' }}>
            <S.Title>{numberUnit(mesoToKRW())} 원</S.Title>
          </S.Horizontal>
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )
}

export default Result
