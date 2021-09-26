import useInventory from '@/hooks/useInventory'
import useUiWindow from '@/hooks/useUiWindow'
import { SlotType } from '@/types/inventory'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import Slot from './Slot'
import * as S from './style'

type InventoryProps = {
  handleDrop: (startSlot: SlotType, endSlot: SlotType) => void
}

const PREV_INVEN_WIDTH = 172
const TOOLTIP_WIDTH = 300 + 10

const Inventory: React.FC<InventoryProps> = ({ handleDrop }) => {
  const {
    currentInventory,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventoryUse,
    onSortInventory,
    inventory
  } = useInventory()
  const {
    isOpenedWindow,
    uiWindowList,
    onSetTop,
    onAddUiWindow,
    onRemoveUiWindow
  } = useUiWindow()
  const ref = useRef<HTMLDivElement>(null)
  const [inventoryPosition, setInventoryPosition] = useState<{
    width: number
    height: number
    top: number
    left: number
  }>({ width: 0, height: 0, top: 0, left: 0 })

  const toggleFlameWindow = () => {
    if (isOpenedWindow('FlameOfResurrection')) {
      onRemoveUiWindow('FlameOfResurrection')
    } else {
      onAddUiWindow('FlameOfResurrection')
    }
  }

  useEffect(() => {
    if (ref.current?.parentElement?.clientWidth !== undefined) {
      setInventoryPosition({
        ...inventoryPosition,
        width: ref.current.parentElement.clientWidth,
        height: ref.current.parentElement.clientHeight,
        top: ref.current.parentElement.clientTop,
        left: ref.current.parentElement.clientLeft
      })
    }
  }, [ref.current?.parentElement?.clientWidth])

  return (
    <Draggable
      handle=".handle"
      bounds="body"
      defaultPosition={{
        x: inventoryPosition.width,
        y: 100
      }}
    >
      <S.Contianer
        ref={ref}
        style={{
          left: inventoryPosition.width + inventoryPosition.width / 2 - 150,
          visibility: isOpenedWindow('Inventory') ? 'visible' : 'hidden',
          zIndex:
            uiWindowList[uiWindowList.length - 1] === 'Inventory'
              ? 1
              : undefined
        }}
        onClick={() => onSetTop('Inventory')}
      >
        <S.InventoryHeader className="handle">ITEM INVENTORY</S.InventoryHeader>
        <S.InventoryBody>
          <S.InventoryButtonWrapper>
            <S.InventoryButton
              onClick={onSetInventoryEquip}
              className={currentInventory === 'Equip' ? 'isActive' : ''}
            >
              장비
            </S.InventoryButton>
            <S.InventoryButton
              onClick={onSetInventoryUse}
              className={currentInventory === 'Use' ? 'isActive' : ''}
            >
              소비
            </S.InventoryButton>
            <S.InventoryButton
              onClick={onSetInventoryEtc}
              className={currentInventory === 'Etc' ? 'isActive' : ''}
            >
              기타
            </S.InventoryButton>
          </S.InventoryButtonWrapper>
          <S.ItemWrapper>
            {inventory[currentInventory].map((slot) => (
              <Slot
                key={slot.id}
                slot={slot}
                onDrop={(startSlot) => handleDrop(startSlot, slot)}
              />
            ))}
          </S.ItemWrapper>
        </S.InventoryBody>
        <S.InventoryFooter>
          <S.Horizontal>
            <S.Button onClick={onSortInventory}>정렬</S.Button>
            <S.Button onClick={() => toggleFlameWindow()}>환불</S.Button>
          </S.Horizontal>
        </S.InventoryFooter>
      </S.Contianer>
    </Draggable>
  )
}

export default Inventory
