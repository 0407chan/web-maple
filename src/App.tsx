import { getAllEquip } from '@/api/equipItem'
import { EQUIP_LIST } from '@/dummy/equip'
import useInventory from '@/hooks/useInventory'
import React, { useEffect } from 'react'
import { useGetEquipment } from './api/equipment'
import * as S from './appStyle'
import Equipment from './components/Equipment'
import Inventory from './components/Inventory'
import InventoryPrev from './components/InventoryPrev'
import ToolTipPrev from './components/ToolTipPrev'
import useEquipment from './hooks/useEquipment'
import useUiWindow from './hooks/useUiWindow'
import { EquipSlotType } from './types/equipment'
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
    onRemoveEquipItem,
    onIncreaseEquipMaxNum,
    onOpenEquipInventory,
    onSwitchSlot
  } = useInventory()

  const { onSetEquip, onRemoveEquip } = useEquipment()

  const { onAddUiWindow, onRemoveUiWindow, uiWindowList, isOpenedWindow } =
    useUiWindow()

  const equipQeury = useGetEquipment()

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

  const handleDrop = (
    startSlot: SlotType | EquipSlotType,
    endSlot: SlotType
  ) => {
    // 장비창에서 인벤토리로 이동
    if ('slotType' in startSlot) {
      // 장비는 제거
      onRemoveEquip('WEAPON')

      // 인벤토리에 아이템이 있으면 인벤토리 아이템을 장비창에 추가
      if (endSlot.item) {
        onSetEquip('WEAPON', endSlot.item)
      }
      // 장비창의 아이템을 인벤토리로 추가
      onAddEquipment({
        ...endSlot,
        item: startSlot.item
      })
    }

    // 인벤토리에서 인벤토리로 이동
    else {
      onSwitchSlot(startSlot, endSlot)
    }
  }

  const inventoryToEquipDrop = (
    startSlot: SlotType,
    endSlot: EquipSlotType
  ) => {
    if (startSlot.item) {
      //인벤토리에선 제거
      onRemoveEquipItem(startSlot.id)

      //착용했던 장비가 있으면, 그 장비를 인벤토리 위치로 추가
      if (endSlot.item) {
        onAddEquipment({
          ...startSlot,
          item: endSlot.item
        })
      }
      // 인벤토리 아이템을 장비창에 장착
      onSetEquip('WEAPON', startSlot.item)
    }
  }

  const handleKeyDown = (ev: KeyboardEvent) => {
    console.log(ev.key)
    switch (ev.key) {
      case 'ㅑ':
      case 'i': {
        if (isOpenedWindow('Inventory')) {
          onRemoveUiWindow('Inventory')
        } else {
          onAddUiWindow('Inventory')
        }
        break
      }
      case 'ㄷ':
      case 'e': {
        if (isOpenedWindow('Equipment')) {
          onRemoveUiWindow('Equipment')
        } else {
          onAddUiWindow('Equipment')
        }
        break
      }
      case 'Escape': {
        if (uiWindowList.length > 0) {
          onRemoveUiWindow(uiWindowList[uiWindowList.length - 1])
        }
      }
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [uiWindowList])

  useEffect(() => {
    console.log(equipQeury.data?.equipGroup)
    console.log(equipQeury.data?.metaInfo)
  }, [equipQeury])

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
          <Equipment handleDrop={inventoryToEquipDrop} />
        </S.Bound>
      </S.BoundWrapper>
    </S.Contianer>
  )
}

export default App
