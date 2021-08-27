import { getAllEquip } from '@/api/equipItem'
import { EQUIP_LIST } from '@/dummy/equip'
import useInventory from '@/hooks/useInventory'
import React from 'react'
import * as S from './appStyle'
import Inventory from './components/Inventory'
import InventoryPrev from './components/InventoryPrev'
import ToolTipPrev from './components/ToolTipPrev'
import { SlotType } from './types/inventory'

export const ItemTypes = {
  FOOD: 'food',
  GLASS: 'glass',
  PAPER: 'paper'
}

const App: React.FC = () => {
  const {
    onAddEquipment,
    inventory,
    currentInventory,
    equipMaxNum,
    onIncreaseEquipMaxNum,
    onOpenEquipInventory,
    onSwitchSlot
  } = useInventory()

  const addRandomEquip = () => {
    const emptyInven = inventory[currentInventory].filter(
      (slot) => slot.isOpen && slot.item === undefined
    )
    if (emptyInven.length === 0) {
      console.log('장비창 꽉찼다!')
      return
    }
    const randomNum = Math.floor(Math.random() * EQUIP_LIST.length)
    const newSlot: SlotType = { ...emptyInven[0], item: EQUIP_LIST[randomNum] }

    // const newEquip = { ...EQUIP_LIST[Math.floor(Math.random() * 5)] }
    // API.EquipItem.addEquip(newEquip);
    onAddEquipment(newSlot)
  }

  const onGetAllEquipment = async () => {
    try {
      const payload = await getAllEquip()
      console.log(payload)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDrop = (startSlot: SlotType, endSlot: SlotType) => {
    onSwitchSlot(startSlot, endSlot)
  }

  return (
    <S.Contianer>
      <S.HeaderWrapper>
        <S.Header style={{ paddingTop: 0 }}>Web Maple</S.Header>
        <S.ButtonWrapper>
          <S.Horizontal>
            <S.Button onClick={() => addRandomEquip()}>장비 추가</S.Button>
            <S.Button
              disabled={equipMaxNum > 50}
              className={equipMaxNum > 50 ? 'disabled' : ''}
              onClick={onIncreaseEquipMaxNum}
            >
              인벤토리 확장
            </S.Button>
            <S.Button onClick={onOpenEquipInventory}>인벤토리 활성화</S.Button>
            {/* <button onClick={onGetAllEquipment}>장비 불러오기</button> */}
          </S.Horizontal>
        </S.ButtonWrapper>
      </S.HeaderWrapper>
      <S.BoundWrapper>
        <S.Bound className="prev-bound">
          <S.Header>Prev Inventory</S.Header>
          <ToolTipPrev />
          <InventoryPrev />
        </S.Bound>

        <S.Bound className="new-bound">
          <S.Header>New Inventory</S.Header>
          <Inventory handleDrop={handleDrop} />
        </S.Bound>
      </S.BoundWrapper>
    </S.Contianer>
  )
}

export default App
