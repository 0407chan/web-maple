import { EQUIP_LIST } from '@/dummy/equip'
import useInventory from '@/hooks/useInventory'
import React, { useEffect, useState } from 'react'
import { getEquipment, useGetEquipmentList } from './api/equipment'
import * as S from './appStyle'
import Equipment from './components/Equipment'
import Inventory from './components/Inventory'
import InventoryPrev from './components/InventoryPrev'
import ToolTipPrev from './components/ToolTipPrev'
import useEquipment from './hooks/useEquipment'
import useUiWindow from './hooks/useUiWindow'
import { EquipSlotType, GetEquipmentListQuery } from './types/equipment'
import { SlotType } from './types/inventory'

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

  const [equipListSearchQuery] = useState<GetEquipmentListQuery>({
    overallCategoryFilter: 'Equip'
    // categoryFilter: 'One-Handed Weapon',
    // subCategoryFilter: 'One-Handed Sword'
  })

  const equipListQeury = useGetEquipmentList(equipListSearchQuery)

  const getEquipBy = async (name: string) => {
    const existItem = equipListQeury.data?.find((item) => item.name === name)
    if (existItem) {
      const item = await getEquipment({ itemId: existItem.id })
      console.log(item)
    } else {
      console.log(name, '은 없음!')
    }
  }

  const getAllEquip = async () => {
    console.log('고!')
    const promise = []
    // 무기
    promise.push(getEquipment({ itemId: 1402000 }))
    promise.push(getEquipment({ itemId: 1412000 }))
    promise.push(getEquipment({ itemId: 1432000 }))

    // 방어구
    promise.push(getEquipment({ itemId: 1040000 })) //상의
    promise.push(getEquipment({ itemId: 1060000 })) //바지
    promise.push(getEquipment({ itemId: 1100001 })) //망토
    promise.push(getEquipment({ itemId: 1082004 })) //장갑
    promise.push(getEquipment({ itemId: 1002025 })) //투구
    promise.push(getEquipment({ itemId: 1050000 })) //한벌옷
    promise.push(getEquipment({ itemId: 1092008 })) //방패
    promise.push(getEquipment({ itemId: 1072970 })) //신발

    // 악세
    promise.push(getEquipment({ itemId: 1132006 })) //벨트
    promise.push(getEquipment({ itemId: 1032000 })) //귀걸이
    promise.push(getEquipment({ itemId: 1190000 })) //엠블렘
    promise.push(getEquipment({ itemId: 1022144 })) //눈장식
    promise.push(getEquipment({ itemId: 1012070 })) //얼굴장식
    promise.push(getEquipment({ itemId: 1122000 })) //팬던트
    promise.push(getEquipment({ itemId: 1113149 })) //반지
    promise.push(getEquipment({ itemId: 1152178 })) //견장
    const itemList = await Promise.all(promise)

    const equipGroup = new Set()
    const category = new Set()
    const overallCategory = new Set()
    const subCategory = new Set()
    const islots = new Set()
    itemList.forEach((item) => {
      equipGroup.add(item.equipGroup)
      category.add(item.typeInfo.category)
      overallCategory.add(item.typeInfo.overallCategory)
      subCategory.add(item.typeInfo.subCategory)
      item.metaInfo.islots.forEach((slot) => islots.add(slot))
      console.log(item.description.name, item.metaInfo.islots)
    })
    console.log('equipGroup', Array.from(equipGroup))
    console.log('category', Array.from(category))
    console.log('subCategory', Array.from(subCategory))
    console.log('overallCategory', Array.from(overallCategory))
    console.log('islots', Array.from(islots))
    console.log(itemList)
  }

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
      onRemoveEquip('Wp')

      // 인벤토리에 아이템이 있으면 인벤토리 아이템을 장비창에 추가
      if (endSlot.item) {
        onSetEquip('Wp', endSlot.item)
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
      onSetEquip('Wp', startSlot.item)
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

  return (
    <S.Contianer>
      <S.HeaderWrapper>
        <S.Header style={{ paddingTop: 0 }}>Web Maple</S.Header>
        <S.ButtonWrapper>
          <S.Horizontal>
            <S.Button onClick={() => getAllEquip()}>가져오자!</S.Button>
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
