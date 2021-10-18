import React from 'react'
import WindowContainer from '../common/WindowContainer'
import * as S from './style'

type EquipmentStoreProps = {
  // handleDrop: (startSlot: SlotType, endSlot: EquipSlotType) => void
}

const EquipmentStore: React.FC<EquipmentStoreProps> = () => {
  return (
    <WindowContainer
      title="EQUIPMENT STORE"
      canDrag={false}
      hideCloseButton
      windowType="EquipmentStore"
      style={{ left: document.body.clientWidth / 2 - 150, top: 200 }}
    >
      <S.Body>안녕</S.Body>
    </WindowContainer>
  )
}

export default EquipmentStore
