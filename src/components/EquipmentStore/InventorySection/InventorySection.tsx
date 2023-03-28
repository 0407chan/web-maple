import message from 'antd/lib/message'
import MapleButton from 'components/common/MapleButton'
import WindowContainer from 'components/common/WindowContainer'
import useInventory from 'hooks/useInventory'
import React from 'react'
import { ControlPosition } from 'react-draggable'
import { SlotType } from 'types/inventory'
import StoreSlot from '../StoreSlot'
import * as S from './style'

type Props = {
  position: ControlPosition
}
const InventorySection: React.FC<Props> = ({ position }) => {
  const { currentInventory, inventory, onRemoveEquipItem } = useInventory()

  const onCellItem = (slot: SlotType) => {
    if (slot.item === undefined) {
      message.error(`판매할 아이템이 존재하지 않습니다.`, 2)
      return
    }
    onRemoveEquipItem(slot.id)
    message.success(`[${slot.item.name}]을 판매했습니다`, 2)
  }

  return (
    <WindowContainer
      hideCloseButton
      title="MY ITEMS"
      windowType="EquipmentStore"
      position={{ ...position, x: position.x + 330 + 3 }}
      canDrag={false}
    >
      <S.Vertical style={{ gap: 0 }}>
        <S.InventoryButtonWrapper>
          <S.InventoryButton
            className={currentInventory === 'Equip' ? 'isActive' : ''}
          >
            장비
          </S.InventoryButton>
        </S.InventoryButtonWrapper>
        <S.Container>
          {inventory[currentInventory].map((slot) => {
            if (slot.item) {
              return (
                <StoreSlot
                  key={slot.id}
                  searchKey=""
                  item={{ id: slot.item?.itemId, name: slot.item?.name }}
                  button={
                    <MapleButton size="small" onClick={() => onCellItem(slot)}>
                      판매
                    </MapleButton>
                  }
                />
              )
            }
          })}
        </S.Container>
      </S.Vertical>
    </WindowContainer>
  )
}

export default InventorySection
