import useEquipment from '@/hooks/useEquipment'
import useToolTip from '@/hooks/useToolTip'
import useUiWindow from '@/hooks/useUiWindow'
import { EquipSlotType } from '@/types/equipment'
import { SlotType } from '@/types/inventory'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import EquipSlot from './EquipSlot'
import * as S from './style'

type EquipmentProps = {
  handleDrop: (startSlot: SlotType, endSlot: EquipSlotType) => void
}

const PREV_INVEN_WIDTH = 172
const TOOLTIP_WIDTH = 300 + 10

const Equipment: React.FC<EquipmentProps> = ({ handleDrop }) => {
  const { visible } = useToolTip()
  const { isOpenedWindow } = useUiWindow()
  const { equipment } = useEquipment()
  const ref = useRef<HTMLDivElement>(null)
  const [inventoryPosition, setEquipmentPosition] = useState<{
    width: number
    height: number
    top: number
    left: number
  }>({ width: 0, height: 0, top: 0, left: 0 })

  useEffect(() => {
    if (ref.current?.parentElement?.clientWidth !== undefined) {
      setEquipmentPosition({
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
    let result = inventoryPosition.left + TOOLTIP_WIDTH
    if (positionLeft + 300 + TOOLTIP_WIDTH > document.body.clientWidth) {
      result = inventoryPosition.left - TOOLTIP_WIDTH
    }
    return result
  }

  return (
    <Draggable handle=".handle" bounds="body">
      <S.Contianer
        ref={ref}
        style={{
          visibility: isOpenedWindow('Equipment') ? 'visible' : 'hidden'
        }}
      >
        <S.Header className="handle">EQUIPMENT INVENTORY</S.Header>
        <S.Body>
          <S.ItemWrapper>
            {equipment.map((slot) => (
              <EquipSlot
                key={slot.id}
                slot={slot}
                onDrop={(startSlot) => handleDrop(startSlot, slot)}
              />
            ))}
          </S.ItemWrapper>
        </S.Body>
        <br></br>
        {/* {visible && (
          <ToolTip
            positionX={getTooltipX()}
            positionY={inventoryPosition.top}
          />
        )} */}
      </S.Contianer>
    </Draggable>
  )
}

export default Equipment
