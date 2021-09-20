import Item2 from '@/components/Item/Item2'
import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipSlotType } from '@/types/equipment'
import { SlotType } from '@/types/inventory'
import React from 'react'
import { useDrop } from 'react-dnd'
import * as S from './style'

type SlotProps = {
  slot: EquipSlotType
  onDrop: (slot: any) => void
}
const EquipSlot: React.FC<SlotProps> = ({ slot, onDrop }) => {
  let timer: any = undefined
  const { getEmptySlot, onAddEquipment } = useInventory()
  const { equipment, onRemoveEquip } = useEquipment()
  const { onHideTooltip } = useToolTip()
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'item',
    drop: onDrop,
    // drop: (item, monitor) => onDrop(monitor),
    canDrop: (item) => isMySlot(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isMySlot = (item: SlotType) => {
    if (item.item && item.item.islots === slot.slotType) {
      return true
    }
    return false
  }

  const isActive = () => {
    const isActive = isOver && canDrop
    let result = ''
    if (isActive) {
      result += ' isActive'
    } else if (canDrop) {
      result += ' canDrop'
    }
    return result
  }
  const isOpen = () => {
    return slot.isOpen ? 'isOpen' : 'isClosed'
  }

  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    clearTimeout(timer)
    if (event.detail === 1) {
      timer = setTimeout(() => {
        console.log('싱글 클릭')
      }, 200)
    } else if (event.detail === 2) {
      if (slot.item) {
        if (equipment[9].item) {
          const emptySlot = getEmptySlot()
          if (emptySlot) {
            onAddEquipment({
              ...emptySlot,
              item: equipment[9].item
            })
            onRemoveEquip('Wp')
            onHideTooltip()
          }
        }
      }
    }
  }

  return (
    <S.Contianer
      ref={drop}
      role="Dustbin"
      onClick={onClickHandler}
      className={`${isActive()} ${isOpen()}`}
    >
      <S.SlotName className="no-drag">{slot.slotTypeName}</S.SlotName>
      {slot.item?.id !== '' && <Item2 slot={slot} />}
    </S.Contianer>
  )
}

export default EquipSlot
