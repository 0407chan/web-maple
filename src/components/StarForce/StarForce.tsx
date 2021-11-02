import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import { EquipItemType, SlotType } from '@/types/inventory'
import React, { useState } from 'react'
import { ControlPosition } from 'react-draggable'
import { v4 as uuid } from 'uuid'
import WindowContainer from '../common/WindowContainer'

const initSlot: SlotType = {
  id: uuid(),
  isOpen: true
}

const StarForce: React.FC = () => {
  const { inventory, currentInventory, onUpdateInventorySlot } = useInventory()
  const { equipment, onUpdateEquipSlot } = useEquipment()
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 150,
    y: 200
  })
  const [starForceSlot, setStarForceSlot] = useState<SlotType>(initSlot)

  const setItemOnOriginalSlot = (newItem: EquipItemType) => {
    const equipSlot = equipment.find((slot) => slot.item?.id === newItem.id)
    if (equipSlot) {
      onUpdateEquipSlot({ ...equipSlot, item: newItem })
      return
    }

    const invenSlot = inventory[currentInventory].find(
      (slot) => slot.item?.id === newItem.id
    )
    if (invenSlot) {
      onUpdateInventorySlot({ ...invenSlot, item: newItem })
    }
  }

  return (
    <WindowContainer
      title="EQUIPMENT ENCHANT"
      windowType="EquipmentEnchant"
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      position={position}
    >
      StarForce
    </WindowContainer>
  )
}

export default StarForce
