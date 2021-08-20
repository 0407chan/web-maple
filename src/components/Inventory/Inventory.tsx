import useInventory from '@/hooks/useInventory'
import { SlotType } from '@/types/inventory'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import Slot from './Slot'
import * as S from './style'

type InventoryProps = {
  handleDrop: (startSlot: SlotType, endSlot: SlotType) => void
}
const Inventory: React.FC<InventoryProps> = ({ handleDrop }) => {
  const {
    currentInventory,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventorySetup,
    onSetInventoryUse,
    invenEquip
  } = useInventory()

  const ref = useRef<HTMLDivElement>(null)
  const [positionX, setPositionX] = useState<number>(0)
  const [drag, setDrag] = useState(0)

  const onStart = () => {
    setDrag(1)
  }
  const onStop = () => {
    setDrag(0)
  }

  useEffect(() => {
    if (ref.current?.parentElement?.clientWidth !== undefined) {
      setPositionX(ref.current.parentElement.clientWidth)
    }
  }, [ref.current?.parentElement?.clientWidth])

  return (
    <Draggable
      handle=".handle"
      bounds="body"
      onStart={onStart}
      onStop={onStop}
      defaultPosition={{
        x: positionX,
        y: 100
      }}
    >
      <S.Contianer ref={ref} style={{ left: positionX + positionX / 2 - 150 }}>
        <S.InventoryHeader className="handle">ITEM INVENTORY</S.InventoryHeader>
        <S.InventoryBody>
          <S.InventoryButtonWrapper>
            <S.InventoryButton
              onClick={onSetInventoryEquip}
              className={currentInventory === 0 ? 'isActive' : ''}
            >
              장비
            </S.InventoryButton>
            <S.InventoryButton
              onClick={onSetInventoryUse}
              className={currentInventory === 1 ? 'isActive' : ''}
            >
              소비
            </S.InventoryButton>
            <S.InventoryButton
              onClick={onSetInventoryEtc}
              className={currentInventory === 2 ? 'isActive' : ''}
            >
              기타
            </S.InventoryButton>
            <S.InventoryButton
              onClick={onSetInventorySetup}
              className={currentInventory === 3 ? 'isActive' : ''}
            >
              설치
            </S.InventoryButton>
          </S.InventoryButtonWrapper>
          <S.ItemWrapper>
            {currentInventory === 0 &&
              invenEquip.map((slot, index) => (
                <Slot
                  key={slot.id}
                  slot={slot}
                  onDrop={(startSlot) => handleDrop(startSlot, slot)}
                />
              ))}
          </S.ItemWrapper>
        </S.InventoryBody>
      </S.Contianer>
    </Draggable>
  )
}

export default Inventory
