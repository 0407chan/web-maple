import MapleButton from '@/components/common/MapleButton'
import WindowContainer from '@/components/common/WindowContainer'
import { numberUnit } from '@/components/FlameOfResurrection/Result/utils'
import { EquipItemType } from '@/types/inventory'
import { numberWithCommas } from '@/utils/number/numberWithCommas'
import React from 'react'
import { ControlPosition } from 'react-draggable'
import * as S from './style'

// 2048716 강환불 Powerful Rebirth Flame
// 2048717 영환불 Eternal Rebirth Flame
const WonImage = `${process.env.PUBLIC_URL}/images/money/won.png`

type Props = {
  item: EquipItemType | undefined
  result: Map<
    string,
    {
      destroyed: number
      cost: number
    }
  >
  setResult: React.Dispatch<
    React.SetStateAction<
      Map<
        string,
        {
          destroyed: number
          cost: number
        }
      >
    >
  >
  position: ControlPosition
  mesoKrwSetting: number | undefined
}
const Result: React.FC<Props> = ({
  item,
  result,
  setResult,
  position,
  mesoKrwSetting
}) => {
  const initItemStatusSetting = () => {
    if (item === undefined) return
    // let res = result.get(item.id)
    // if (res) {
    //   res = { ...res, POWERFUL: res.POWERFUL ? res.POWERFUL + 1 : 0 + 1 }
    //   result.set(item.id, { ...res, POWERFUL: 0, ETERNAL: 0 })
    // }
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

  // const totalCost = () => {
  //   return calcCost('ETERNAL') + calcCost('POWERFUL')
  // }

  const mesoToKRW = () => {
    return Math.floor((getCost() / 100000000) * (mesoKrwSetting || 0))
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
                  <S.ItemImage
                    isDestroyed={true}
                    src={item?.image}
                    alt="powerImage"
                  />
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
            <MapleButton size="small" onClick={initItemStatusSetting}>
              초기화
            </MapleButton>
          </S.Horizontal>
          <S.Block>
            <S.Horizontal>
              <S.Text>
                <img
                  src="https://maplestory.io/api/KMS/353/item/2438119/icon"
                  alt="powerImage"
                />
              </S.Text>
              <S.Input readOnly value={numberWithCommas(getCost())} />
            </S.Horizontal>
          </S.Block>
          <S.Horizontal style={{ justifyContent: 'flex-end' }}>
            <S.Title>{numberUnit(getCost())} 메소</S.Title>
          </S.Horizontal>
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Horizontal>
            <S.Title>현금 치환</S.Title>
            <MapleButton size="small" onClick={initItemStatusSetting}>
              초기화
            </MapleButton>
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
