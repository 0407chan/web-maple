import Item2 from '@/components/Item/Item2'
import { SlotType } from '@/types/inventory'
import React from 'react'
import { useDrop } from 'react-dnd'
import * as S from './style'

type SlotProps = {
  slot: SlotType
  onDrop: (slot: any) => void
}
const Slot: React.FC<SlotProps> = ({ slot, onDrop }) => {
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

  const isMySlot = (item: any) => {
    if (item.id === slot.id) {
      return false
    }
    return true
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
  return (
    <S.Contianer
      ref={drop}
      role="Dustbin"
      className={`${isActive()} ${isOpen()}`}
    >
      {slot.item?.id !== '' && <Item2 slot={slot} />}
    </S.Contianer>
  )
}

export default Slot
