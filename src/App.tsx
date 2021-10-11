import useInventory from '@/hooks/useInventory'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  getEquipment,
  getEquipmentList,
  useGetEquipmentList
} from './api/equipment'
import * as S from './appStyle'
import Equipment from './components/Equipment'
import FlameOfResurrection from './components/FlameOfResurrection'
import Inventory from './components/Inventory'
import ToolTip from './components/ToolTip'
import { EMPTY_EQUIP } from './dummy/equip'
import useEquipment from './hooks/useEquipment'
import useUiWindow from './hooks/useUiWindow'
import {
  EquipmentItemDto,
  EquipSlotType,
  GetEquipmentListQuery,
  SubCategory,
  subCategoryName
} from './types/equipment'
import { EquipItemType, SlotType } from './types/inventory'
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

  const {
    onAddUiWindow,
    onRemoveUiWindow,
    uiWindowList,
    isOpenedWindow,
    onRemoveLastWindow
  } = useUiWindow()

  const [weaponListSearchQuery] = useState<GetEquipmentListQuery>({
    overallCategoryFilter: 'Equip',
    categoryFilter: 'One-Handed Weapon',
    subCategoryFilter: 'One-Handed Sword'
  })
  const [pantsListSearchQuery] = useState<GetEquipmentListQuery>({
    overallCategoryFilter: 'Equip',
    subCategoryFilter: 'Bottom'
  })

  const weaponListQeury = useGetEquipmentList(weaponListSearchQuery)
  const pantsListQeury = useGetEquipmentList(pantsListSearchQuery)

  const getEquipBy = async (name: string) => {
    const existItem = weaponListQeury.data?.find((item) => item.name === name)
    if (existItem) {
      const item = await getEquipment({ itemId: existItem.id })
      const emptyInven = inventory[currentInventory].filter(
        (slot) => slot.isOpen && slot.item === undefined
      )
      if (emptyInven.length === 0) {
        console.log('장비창 꽉찼다!')
        return
      }
      const newItem: EquipItemType = {
        ...EMPTY_EQUIP,
        id: uuid(),
        bossReward: item.metaInfo.bossReward,
        name: item.description.name,
        category: item.typeInfo.subCategory as SubCategory,
        categoryName: subCategoryName[item.typeInfo.subCategory as SubCategory],
        image: `https://maplestory.io/api/KMS/352/item/${item.id}/icon`,
        max_upgrade: item.metaInfo.tuc,
        upgrade: 0,
        max_star: 5,
        upgrade_avalable: item.metaInfo.tuc,
        islots: item.metaInfo.islots[0],
        WEAPON_ATTACK: {
          base: item.metaInfo.incPAD,
          bonus: 0,
          label: '공격력',
          reinforce: 0
        }
      }

      onAddEquipment({
        ...emptyInven[0],
        item: newItem
      })
      // console.log(item)
    } else {
      console.log(name, '은 없음!')
    }
  }

  const getAllEquip = async () => {
    const promise = []
    // 무기
    promise.push(getEquipment({ itemId: 1402000 }))
    promise.push(getEquipment({ itemId: 1402268 }))
    promise.push(getEquipment({ itemId: 1402259 }))
    promise.push(getEquipment({ itemId: 1382265 }))

    // 방어구
    promise.push(getEquipment({ itemId: 1040000 })) //상의
    promise.push(getEquipment({ itemId: 1062260 })) //바지
    promise.push(getEquipment({ itemId: 1100001 })) //망토
    promise.push(getEquipment({ itemId: 1082695 })) //장갑
    promise.push(getEquipment({ itemId: 1004808 })) //투구
    promise.push(getEquipment({ itemId: 1053063 })) //한벌옷
    // promise.push(getEquipment({ itemId: 1092008 })) //방패
    promise.push(getEquipment({ itemId: 1073158 })) //신발

    // 악세
    promise.push(getEquipment({ itemId: 1132006 })) //벨트
    promise.push(getEquipment({ itemId: 1032000 })) //귀걸이
    // promise.push(getEquipment({ itemId: 1190000 })) //엠블렘
    promise.push(getEquipment({ itemId: 1022144 })) //눈장식
    promise.push(getEquipment({ itemId: 1012070 })) //얼굴장식
    promise.push(getEquipment({ itemId: 1122000 })) //팬던트
    promise.push(getEquipment({ itemId: 1113149 })) //반지
    promise.push(getEquipment({ itemId: 1152178 })) //견장
    const itemList = await Promise.all(promise)

    itemList.forEach((item, index) => {
      onAddEquipment({
        ...inventory[currentInventory][index],
        item: transDtoToType(item)
      })
    })
  }

  const transDtoToType = (itemDto: EquipmentItemDto) => {
    // console.log(itemDto.description.name, itemDto.metaInfo)
    const result: EquipItemType = {
      ...EMPTY_EQUIP,
      id: uuid(),
      bossReward: itemDto.metaInfo.bossReward,
      level: itemDto.metaInfo.reqLevel,
      name: itemDto.description.name,
      category: itemDto.typeInfo.subCategory as SubCategory,
      categoryName:
        subCategoryName[itemDto.typeInfo.subCategory as SubCategory],
      image: `https://maplestory.io/api/KMS/352/item/${itemDto.id}/icon`,
      max_upgrade: itemDto.metaInfo.tuc,
      upgrade: 0,
      max_star: 5,
      upgrade_avalable: itemDto.metaInfo.tuc,
      islots: itemDto.metaInfo.islots[0],
      WEAPON_ATTACK: {
        ...EMPTY_EQUIP.WEAPON_ATTACK,
        base: itemDto.metaInfo.incPAD || EMPTY_EQUIP.WEAPON_ATTACK.base
      },
      MAGIC_ATTACK: {
        ...EMPTY_EQUIP.MAGIC_ATTACK,
        base: itemDto.metaInfo.incMAD || EMPTY_EQUIP.MAGIC_ATTACK.base
      },
      STR: {
        ...EMPTY_EQUIP.STR,
        base: itemDto.metaInfo.incSTR || EMPTY_EQUIP.STR.base
      },
      INT: {
        ...EMPTY_EQUIP.INT,
        base: itemDto.metaInfo.incINT || EMPTY_EQUIP.INT.base
      },
      DEX: {
        ...EMPTY_EQUIP.DEX,
        base: itemDto.metaInfo.incDEX || EMPTY_EQUIP.DEX.base
      },
      LUK: {
        ...EMPTY_EQUIP.LUK,
        base: itemDto.metaInfo.incLUK || EMPTY_EQUIP.LUK.base
      },
      MP: {
        ...EMPTY_EQUIP.MP,
        base: itemDto.metaInfo.incMMP || EMPTY_EQUIP.MP.base
      },
      HP: {
        ...EMPTY_EQUIP.HP,
        base: itemDto.metaInfo.incMHP || EMPTY_EQUIP.HP.base
      },
      DEFENCE: {
        ...EMPTY_EQUIP.DEFENCE,
        base: itemDto.metaInfo.incPDD || EMPTY_EQUIP.DEFENCE.base
      },
      AVOIDABLILITY: {
        ...EMPTY_EQUIP.AVOIDABLILITY,
        base: itemDto.metaInfo.incEVA || EMPTY_EQUIP.AVOIDABLILITY.base
      },
      IgnoreDefence: {
        ...EMPTY_EQUIP.IgnoreDefence,
        base: itemDto.metaInfo.imdR || EMPTY_EQUIP.IgnoreDefence.base
      },
      bossDemage: {
        ...EMPTY_EQUIP.bossDemage,
        base: itemDto.metaInfo.bdR || EMPTY_EQUIP.bossDemage.base
      },
      jump: {
        ...EMPTY_EQUIP.jump,
        base: itemDto.metaInfo.incJump || EMPTY_EQUIP.jump.base
      },
      speed: {
        ...EMPTY_EQUIP.speed,
        base: itemDto.metaInfo.incSpeed || EMPTY_EQUIP.speed.base
      }
    }
    return result
  }

  const addRandomEquip = async () => {
    if (pantsListQeury === undefined || pantsListQeury.data === undefined)
      return

    const emptyInven = inventory[currentInventory].filter(
      (slot) => slot.isOpen && slot.item === undefined
    )
    if (emptyInven.length === 0) {
      console.log('장비창 꽉찼다!')
      return
    }
    const randomNum = Math.floor(Math.random() * pantsListQeury.data.length)

    const item = await getEquipment({
      itemId: pantsListQeury.data[randomNum].id
    })
    console.log(item)
    const newItem: EquipItemType = {
      ...EMPTY_EQUIP,
      id: uuid(),
      name: item.description.name,
      category: item.typeInfo.subCategory as SubCategory,
      categoryName: subCategoryName[item.typeInfo.subCategory as SubCategory],
      image: `https://maplestory.io/api/KMS/352/item/${item.id}/icon`,
      max_upgrade: item.metaInfo.tuc,
      upgrade: 0,
      upgrade_avalable: item.metaInfo.tuc,
      max_star: 5,
      islots: item.metaInfo.islots[0]
    }

    onAddEquipment({
      ...emptyInven[0],
      item: newItem
    })
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
      onRemoveEquip(startSlot.slotType)

      // 인벤토리에 아이템이 있으면 인벤토리 아이템을 장비창에 추가
      if (endSlot.item) {
        onSetEquip(startSlot.slotType, endSlot.item)
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
      onSetEquip(endSlot.slotType, startSlot.item)
    }
  }

  const findItemByName = async (name: string) => {
    const result = await getEquipmentList({ searchFor: name })
    console.log(`[${name}] 검색 결과`, result)
  }

  const handleKeyDown = (ev: KeyboardEvent) => {
    // console.log(ev.key)
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
      case 'ㄹ':
      case 'f': {
        if (isOpenedWindow('FlameOfResurrection')) {
          onRemoveUiWindow('FlameOfResurrection')
        } else {
          onAddUiWindow('FlameOfResurrection')
        }
        break
      }
      case 'Escape': {
        if (uiWindowList.length > 0) {
          onRemoveLastWindow()
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
    getAllEquip()
    // findItemByName('현금')
  }, [])

  return (
    <S.Contianer>
      <S.HeaderWrapper>
        <S.Header style={{ paddingTop: 0 }}>Web Maple</S.Header>
        {/* <S.ButtonWrapper>
          <S.Horizontal>
            <MapleButton onClick={() => getEquipBy('검')}>
              장비 추가
            </MapleButton>
            <MapleButton
              disabled={equipMaxNum > 50}
              className={equipMaxNum > 50 ? 'disabled' : ''}
              onClick={onIncreaseEquipMaxNum}
            >
              인벤토리 확장
            </MapleButton>
            <MapleButton onClick={onOpenEquipInventory}>
              인벤토리 활성화
            </MapleButton>
          </S.Horizontal>
        </S.ButtonWrapper> */}
      </S.HeaderWrapper>
      {/* <S.BoundWrapper>
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
      </S.BoundWrapper> */}
      <Inventory handleDrop={handleDrop} />
      <Equipment handleDrop={inventoryToEquipDrop} />
      <ToolTip positionX={0} positionY={0} />
      <FlameOfResurrection />
    </S.Contianer>
  )
}

export default App
