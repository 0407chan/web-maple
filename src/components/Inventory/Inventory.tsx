import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { SlotType } from '@/types/inventory'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import ToolTip from '../ToolTip'
import Slot from './Slot'
import * as S from './style'

type InventoryProps = {
  handleDrop: (startSlot: SlotType, endSlot: SlotType) => void
}

const PREV_INVEN_WIDTH = 172
const PREV_TOOLTIP_WIDTH = 261

const Inventory: React.FC<InventoryProps> = ({ handleDrop }) => {
  const {
    currentInventory,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventorySetup,
    onSetInventoryUse,
    onSortInventory,
    invenEquip
  } = useInventory()
  const { visible } = useToolTip()
  const ref = useRef<HTMLDivElement>(null)
  const [inventoryPosition, setInventoryPosition] = useState<{
    width: number
    height: number
    top: number
    left: number
  }>({ width: 0, height: 0, top: 0, left: 0 })

  const [drag, setDrag] = useState(0)

  const onStart = () => {
    setDrag(1)
  }
  const onStop = () => {
    setDrag(0)
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
  const getTooltipX = () => {
    if (!ref.current) return 0
    const positionLeft = ref.current.getClientRects()[0].left
    let result = inventoryPosition.left + 300
    if (positionLeft + 300 + PREV_TOOLTIP_WIDTH > document.body.clientWidth) {
      result = inventoryPosition.left - PREV_TOOLTIP_WIDTH
    }
    return result
  }
  return (
    <Draggable
      handle=".handle"
      bounds="body"
      onStart={onStart}
      onStop={onStop}
      defaultPosition={{
        x: inventoryPosition.width,
        y: 100
      }}
    >
      <S.Contianer
        ref={ref}
        style={{
          left: inventoryPosition.width + inventoryPosition.width / 2 - 150
        }}
      >
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
        <S.InventoryFooter>
          <S.Horizontal>
            <S.Button onClick={onSortInventory}>정렬</S.Button>
          </S.Horizontal>
        </S.InventoryFooter>
        {visible && (
          <ToolTip
            positionX={getTooltipX()}
            positionY={inventoryPosition.top}
          />
        )}
      </S.Contianer>
    </Draggable>
  )
}

export default Inventory
