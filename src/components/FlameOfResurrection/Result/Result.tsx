import WindowContainer from '@/components/common/WindowContainer'
import { EquipItemType } from '@/types/inventory'
import React from 'react'
import { ControlPosition } from 'react-draggable'
import * as S from './style'

// 2048716 강환불 Powerful Rebirth Flame
// 2048717 영환불 Eternal Rebirth Flame

type Props = {
  position: ControlPosition
  flameResult: Map<
    string,
    {
      power: number
      eternal: number
    }
  >
  item: EquipItemType | undefined
}
const Result: React.FC<Props> = ({ item, flameResult, position }) => {
  return (
    <WindowContainer
      windowType="FlameOfResurrection"
      hideCloseButton
      title="RESULT"
      position={{ ...position, x: position.x + 300 + 10 }}
      canDrag={false}
    >
      <S.Contianer>
        <S.Title>환불 사용 갯수</S.Title>
        <S.Block>
          <S.Horizontal>
            <S.Vertical>
              <img
                src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                alt="powerImage"
              />
              <S.Text>{item ? flameResult.get(item.id)?.power || 0 : 0}</S.Text>
            </S.Vertical>
            <S.Vertical>
              <img
                src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                alt="foreverImage"
              />
              <S.Text>
                {item ? flameResult.get(item.id)?.eternal || 0 : 0}
              </S.Text>
            </S.Vertical>
          </S.Horizontal>
        </S.Block>
      </S.Contianer>
    </WindowContainer>
  )
}

export default Result
