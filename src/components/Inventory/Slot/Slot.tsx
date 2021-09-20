import Item2 from '@/components/Item/Item2'
import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { SlotType } from '@/types/inventory'
import React from 'react'
import { useDrop } from 'react-dnd'
import * as S from './style'

type SlotProps = {
  slot: SlotType
  onDrop: (slot: any) => void
}
const Slot: React.FC<SlotProps> = ({ slot, onDrop }) => {
  let timer: any = undefined
  const { equipment, onSetEquip } = useEquipment()
  const { onRemoveEquipItem, onAddEquipment } = useInventory()
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
        onRemoveEquipItem(slot.id)
        if (equipment[9].item) {
          onAddEquipment({
            ...slot,
            item: equipment[9].item
          })
        }
        onSetEquip(slot.item.islots, slot.item)
        onHideTooltip()
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
      {slot.item?.id !== '' && <Item2 slot={slot} />}
    </S.Contianer>
  )
}

export default Slot
