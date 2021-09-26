import useUiWindow from '@/hooks/useUiWindow'
import { SlotType } from '@/types/inventory'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { v4 as uuid } from 'uuid'
import Slot from '../Inventory/Slot'
import * as S from './style'

// 2048716 강환불
// 2048717 영환불

const FlameOfResurrection: React.FC = () => {
  const { isOpenedWindow, uiWindowList, onSetTop } = useUiWindow()
  const ref = useRef<HTMLDivElement>(null)
  const [flameSlot, setFlameSlot] = useState<SlotType>({
    id: uuid(),
    isOpen: true
  })

  const { item } = flameSlot

  const onDrop = (slot: any) => {
    setFlameSlot({ ...slot })
  }
  const isMySlot = (item: SlotType) => {
    return true
  }

  if (!isOpenedWindow('FlameOfResurrection')) return null
  return (
    <Draggable
      handle=".handle"
      bounds="body"
      defaultPosition={{
        x: document.body.clientWidth / 2 - 150,
        y: document.body.clientHeight / 2 - 200
      }}
    >
      <S.Contianer ref={ref}>
        <S.Header className="handle">FLAME OF RESURRECTION</S.Header>
        <S.Body>
          <Slot slot={flameSlot} onDrop={onDrop} isMySlot={isMySlot} />
        </S.Body>
        <S.Result>
          <div>RESULT</div>
          {item && item.STR.bonus > 0 && (
            <div>STR : {flameSlot.item?.STR.bonus}</div>
          )}
          <div>DEX : {flameSlot.item?.DEX.bonus}</div>
          <div>INT : {flameSlot.item?.INT.bonus}</div>
          <div>LUK : {flameSlot.item?.LUK.bonus}</div>
          <div>올스텟 : {flameSlot.item?.AllStat.bonus}</div>
        </S.Result>
        <S.Footer>
          <S.Horizontal>
            <S.Button>
              <img
                src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                alt="powerImage"
              />
              강환불
            </S.Button>
            <S.Button>
              <img
                src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                alt="foreverImage"
              />
              영환불
            </S.Button>
          </S.Horizontal>
        </S.Footer>
      </S.Contianer>
    </Draggable>
  )
}

export default FlameOfResurrection
