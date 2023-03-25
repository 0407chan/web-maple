import useInventory from 'hooks/useInventory'
import useUiWindow from 'hooks/useUiWindow'
import React from 'react'
import { EquipSlotType } from 'types/equipment'
import { SlotType } from 'types/inventory'
import MapleButton from '../common/MapleButton'
import WindowContainer from '../common/WindowContainer'
import Slot from './Slot'
import * as S from './style'

type InventoryProps = {
  handleDrop: (startSlot: SlotType, endSlot: SlotType) => void
}

const Inventory: React.FC<InventoryProps> = ({ handleDrop }) => {
  const {
    currentInventory,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventoryUse,
    onSortInventory,
    inventory
  } = useInventory()

  const { isOpenedWindow, onAddUiWindow, onRemoveUiWindow } = useUiWindow()

  const toggleFlameWindow = () => {
    if (isOpenedWindow('FlameOfResurrection')) {
      onRemoveUiWindow('FlameOfResurrection')
    } else {
      onAddUiWindow('FlameOfResurrection')
    }
  }

  const isMySlot = (
    start: SlotType | EquipSlotType,
    end?: SlotType | EquipSlotType
  ) => {
    // 장비에서 시작
    if ('slotType' in start) {
      if (start.item?.islots === end?.item?.islots || end?.item === undefined)
        return true
      return false
    }
    // 인벤토리에서 시작
    else {
      return true
    }
  }

  return (
    <WindowContainer
      title="ITEM INVENTORY"
      windowType="Inventory"
      style={{ left: (document.body.clientWidth / 4) * 3 - 150, top: 200 }}
      footer={
        <S.Horizontal>
          <MapleButton onClick={onSortInventory}>정렬</MapleButton>
          <MapleButton onClick={() => toggleFlameWindow()}>환불</MapleButton>
        </S.Horizontal>
      }
    >
      <S.Body>
        <S.InventoryButtonWrapper>
          <S.InventoryButton
            onClick={onSetInventoryEquip}
            className={currentInventory === 'Equip' ? 'isActive' : ''}
          >
            장비
          </S.InventoryButton>
          {/* <S.InventoryButton
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
          </S.InventoryButton> */}
        </S.InventoryButtonWrapper>
        <S.ItemWrapper>
          {inventory[currentInventory].map((slot) => (
            <Slot
              key={slot.id}
              slot={slot}
              isMySlot={isMySlot}
              onDrop={(startSlot) => handleDrop(startSlot, slot)}
            />
          ))}
        </S.ItemWrapper>
      </S.Body>
    </WindowContainer>
  )
}

export default Inventory
