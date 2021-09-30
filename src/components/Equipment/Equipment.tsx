import useEquipment from '@/hooks/useEquipment'
import { EquipSlotType } from '@/types/equipment'
import { SlotType } from '@/types/inventory'
import React from 'react'
import WindowContainer from '../common/WindowContainer'
import EquipSlot from './EquipSlot'
import * as S from './style'

type EquipmentProps = {
  handleDrop: (startSlot: SlotType, endSlot: EquipSlotType) => void
}

const Equipment: React.FC<EquipmentProps> = ({ handleDrop }) => {
  const { equipment } = useEquipment()

  return (
    <WindowContainer title="EQUIPMENT INVENTORY" windowType="Equipment">
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
    </WindowContainer>
  )
}

export default Equipment
