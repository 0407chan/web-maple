import MapleButton from '@/components/common/MapleButton'
import WindowContainer from '@/components/common/WindowContainer'
import { EquipItemType } from '@/types/inventory'
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
}
const Result: React.FC<Props> = ({ item, result, setResult, position }) => {
  const initItemStatusSetting = () => {
    if (item === undefined) return
    // let res = result.get(item.id)
    // if (res) {
    //   res = { ...res, POWERFUL: res.POWERFUL ? res.POWERFUL + 1 : 0 + 1 }
    //   result.set(item.id, { ...res, POWERFUL: 0, ETERNAL: 0 })
    // }
    setResult(result)
  }

  // const calcCost = (type: FlameType) => {
  //   if (item === undefined) return 0
  //   const flame = result.get(item.id)
  //   if (flame === undefined) return 0

  //   return (flameCostSetting[type] || 0) * (flame[type] || 0)
  // }

  // const totalCost = () => {
  //   return calcCost('ETERNAL') + calcCost('POWERFUL')
  // }

  // const mesoToKRW = () => {
  //   return Math.floor((totalCost() / 100000000) * (mesoKrwSetting || 0))
  // }
  return (
    <WindowContainer
      windowType="FlameOfResurrection"
      hideCloseButton
      title="RESULT"
      position={{ ...position, x: position.x + 300 + 10 }}
      canDrag={false}
    >
      <S.Vertical>
        <S.Contianer>
          <S.Horizontal>
            <S.Title>환불 사용 갯수</S.Title>
            <MapleButton size="small" onClick={initItemStatusSetting}>
              초기화
            </MapleButton>
          </S.Horizontal>
          <S.Horizontal>
            {/* <S.Block>
              <S.Vertical>
                <img
                  src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                  alt="powerImage"
                />
                <S.Text>
                  {item
                    ? numberWithCommas(result.get(item.id)?.POWERFUL || 0)
                    : 0}
                </S.Text>
              </S.Vertical>
            </S.Block>
            <S.Block>
              <S.Vertical>
                <img
                  src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                  alt="foreverImage"
                />
                <S.Text>
                  {item
                    ? numberWithCommas(result.get(item.id)?.ETERNAL || 0)
                    : 0}
                </S.Text>
              </S.Vertical>
            </S.Block> */}
          </S.Horizontal>
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Horizontal>
            <S.Title>누적 메소</S.Title>
            {/* <MapleButton size="small" onClick={initItemStatusSetting}>
              초기화
            </MapleButton> */}
          </S.Horizontal>
          {/* <S.Block>
            <S.Horizontal>
              <S.Text>
                <img
                  src="https://maplestory.io/api/KMS/353/item/2438119/icon"
                  alt="powerImage"
                />
              </S.Text>
              <S.Input readOnly value={numberWithCommas(totalCost())} />
            </S.Horizontal>
          </S.Block>
          <S.Horizontal style={{ justifyContent: 'flex-end' }}>
            <S.Title>{numberUnit(totalCost())} 메소</S.Title>
          </S.Horizontal> */}
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Horizontal>
            <S.Title>현금 치환</S.Title>
            {/* <MapleButton size="small" onClick={initItemStatusSetting}>
              초기화
            </MapleButton> */}
          </S.Horizontal>
          {/* <S.Block>
            <S.Horizontal>
              <S.Text>
                <img width={30} src={WonImage} alt="KRW" />
              </S.Text>
              <S.Input readOnly value={numberWithCommas(mesoToKRW())} />
            </S.Horizontal>
          </S.Block>
          <S.Horizontal style={{ justifyContent: 'flex-end' }}>
            <S.Title>{numberUnit(mesoToKRW())} 원</S.Title>
          </S.Horizontal> */}
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )
}

export default Result
