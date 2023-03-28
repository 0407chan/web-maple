import useInventory from 'hooks/useInventory'
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { IMAGE } from 'utils/images'
import { getEquipment, getEquipmentList } from './api/equipment'
import * as S from './appStyle'
import MapleButton from './components/common/MapleButton'
import Equipment from './components/Equipment'
import EquipmentStore from './components/EquipmentStore'
import FlameOfResurrection from './components/FlameOfResurrection'
import Inventory from './components/Inventory'
import StarForce from './components/StarForce'
import ToolTip from './components/ToolTip'
import useEquipment from './hooks/useEquipment'
import useItem from './hooks/useItem'
import useUiWindow from './hooks/useUiWindow'
import {
  EquipmentItemListType,
  EquipSlotType,
  GetEquipmentListQuery
} from './types/equipment'
import { SlotType } from './types/inventory'
import { transDtoToType } from './utils/dtoTransUtil'

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

  const { onInitEquipItemList } = useItem()

  const { onSetEquip, onRemoveEquip } = useEquipment()

  const { uiWindowList, onToggleWindow, onRemoveLastWindow } = useUiWindow()

  const [weaponListSearchQuery] = useState<GetEquipmentListQuery>({
    overallCategoryFilter: 'Equip',
    categoryFilter: 'One-Handed Weapon',
    subCategoryFilter: 'One-Handed Sword'
  })
  const [pantsListSearchQuery] = useState<GetEquipmentListQuery>({
    overallCategoryFilter: 'Equip',
    subCategoryFilter: 'Bottom'
  })

  // const weaponListQeury = useGetEquipmentList(weaponListSearchQuery)
  // const pantsListQeury = useGetEquipmentList(pantsListSearchQuery)

  // const getEquipBy = async (name: string) => {
  //   const existItem = weaponListQeury.data?.find((item) => item.name === name)
  //   if (existItem) {
  //     const item = await getEquipment({ itemId: existItem.id })
  //     const emptyInven = inventory[currentInventory].filter(
  //       (slot) => slot.isOpen && slot.item === undefined
  //     )
  //     if (emptyInven.length === 0) {
  //       console.log('장비창 꽉찼다!')
  //       return
  //     }
  //     const newItem: EquipItemType = {
  //       ...EMPTY_EQUIP,
  //       id: uuid(),
  //       bossReward:
  //         item.metaInfo.bossReward !== undefined &&
  //         item.metaInfo.bossReward === true,
  //       name: item.description.name,
  //       category: item.typeInfo.subCategory as SubCategory,
  //       categoryName: subCategoryName[item.typeInfo.subCategory as SubCategory],
  //       image: `https://maplestory.io/api/${import.meta.env.VITE_REGION}/${import.meta.env.VITE_VERSION}/item/${item.id}/icon`,
  //       max_upgrade: item.metaInfo.tuc,
  //       upgrade: 0,
  //       maxStar: 5,
  //       upgrade_avalable: item.metaInfo.tuc,
  //       islots: item.metaInfo.islots[0],
  //       WEAPON_ATTACK: {
  //         base: item.metaInfo.incPAD,
  //         bonus: 0,
  //         label: '공격력',
  //         reinforce: 0
  //       }
  //     }

  //     onAddEquipment({
  //       ...emptyInven[0],
  //       item: newItem
  //     })
  //   } else {
  //     console.log(name, '은 없음!')
  //   }
  // }

  // useEffect(() => {
  //   findItemByName('에테르넬')
  // }, [])

  const findItemByName = async (name: string) => {
    const result = await getEquipmentList({
      overallCategoryFilter: 'Equip',
      cashFilter: false,
      searchFor: name
    })
    console.log(`[${name}] 검색 결과`, result)
  }

  const initEquipItem = async () => {
    const result = await getEquipmentList({
      overallCategoryFilter: 'Equip',
      cashFilter: false
    })
    const newResult: EquipmentItemListType[] = []
    result.forEach((item) => {
      if (!newResult.find((newItem) => newItem.name === item.name)) {
        newResult.push(item)
      }
    })
    onInitEquipItemList(newResult)
  }

  useEffect(() => {
    initEquipItem()
    getAllEquip()
  }, [])

  const getAllEquip = async () => {
    const promise = []
    // 무기
    // promise.push(getEquipment({ itemId: 1213022 })) // 튜너
    // promise.push(getEquipment({ itemId: 1402268 }))
    // promise.push(getEquipment({ itemId: 1382274 }))
    // promise.push(getEquipment({ itemId: 1522152 }))

    // 카루타 세트
    // promise.push(getEquipment({ itemId: 1402196 })) //모자
    // promise.push(getEquipment({ itemId: 1003799 })) //모자
    // promise.push(getEquipment({ itemId: 1042256 })) //상의
    // promise.push(getEquipment({ itemId: 1062260 })) //바지

    // 앱솔 세트
    // promise.push(getEquipment({ itemId: 1004422 })) //모자
    // promise.push(getEquipment({ itemId: 1073030 })) //신발
    // promise.push(getEquipment({ itemId: 1082636 })) //장갑
    // promise.push(getEquipment({ itemId: 1102775 })) //망토

    // 아케인 세트
    // promise.push(getEquipment({ itemId: 1004808 })) //투구
    // promise.push(getEquipment({ itemId: 1082695 })) //장갑
    // promise.push(getEquipment({ itemId: 1073158 })) //신발
    // promise.push(getEquipment({ itemId: 1102940 })) //망토

    // 에테르넬 세트
    promise.push(getEquipment({ itemId: 1005980 })) //투구
    promise.push(getEquipment({ itemId: 1042433 })) //상의
    promise.push(getEquipment({ itemId: 1062285 })) //신발
    // promise.push(getEquipment({ itemId: 1102940 })) //망토

    // 악세
    promise.push(getEquipment({ itemId: 1132308 })) //벨트
    promise.push(getEquipment({ itemId: 1162080 })) //포켓
    promise.push(getEquipment({ itemId: 1032316 })) //귀걸이
    // promise.push(getEquipment({ itemId: 1022278 })) //눈장식
    // promise.push(getEquipment({ itemId: 1012632 })) //얼굴장식
    promise.push(getEquipment({ itemId: 1122430 })) //팬던트
    promise.push(getEquipment({ itemId: 1122443 })) //팬던트 : 데이브레이크 팬던트
    promise.push(getEquipment({ itemId: 1032330 })) //귀걸이 : 에스텔라 이어링
    promise.push(getEquipment({ itemId: 1012757 })) //눈장식 : 트와일라이트 마크
    promise.push(getEquipment({ itemId: 1113313 })) //링 : 가디언 엔젤링
    const itemList = await Promise.all(promise)

    // console.log('뭐나와?', itemList)
    itemList.forEach((item, index) => {
      onAddEquipment({
        ...inventory[currentInventory][index],
        item: transDtoToType(item)
      })
    })
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

  const handleKeyDown = (ev: KeyboardEvent) => {
    // console.log(ev.key)
    if (document.activeElement?.nodeName !== 'BODY') return
    switch (ev.key) {
      case 'ㅑ':
      case 'i': {
        onToggleWindow('Inventory')
        break
      }
      // case 'ㄷ':
      // case 'e': {
      //   onToggleWindow('Equipment')
      //   break
      // }
      case 'ㄹ':
      case 'f': {
        onToggleWindow('FlameOfResurrection')
        break
      }
      case 'Escape': {
        if (uiWindowList.length > 0) {
          onRemoveLastWindow()
        }
        break
      }
      default:
        return false
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [uiWindowList])

  const initReactGA = () => {
    ReactGA.initialize(import.meta.env.VITE_ID || '')
  }

  useEffect(() => {
    initReactGA()
    console.log(import.meta.env.VITE_REGION, import.meta.env.VITE_VERSION)
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
      <S.Horizontal>
        {/* <S.Vertical>
          <MapleButton
            style={{ height: 40, width: 40 }}
            onClick={() => onToggleWindow('Equipment')}
          >
            E
          </MapleButton>
          <div>장비창</div>
        </S.Vertical> */}
        <S.Vertical>
          <MapleButton
            style={{ height: 40, width: 40 }}
            onClick={() => onToggleWindow('Inventory')}
          >
            I
          </MapleButton>
          <div>인벤토리</div>
        </S.Vertical>
        <S.Vertical>
          <MapleButton
            style={{ height: 40, width: 40 }}
            onClick={() => onToggleWindow('FlameOfResurrection')}
          >
            F
          </MapleButton>
          <div>환불창</div>
        </S.Vertical>
        <S.Vertical>
          <MapleButton
            style={{ height: 40, width: 40 }}
            onClick={() => onToggleWindow('EquipmentEnchant')}
            icon={
              <img
                width={15}
                style={{ filter: 'drop-shadow(0 0 0.2rem #9a6100)' }}
                src={IMAGE.STAR_FORCE}
                alt="starImage"
              />
            }
          />
          <div>스타포스</div>
        </S.Vertical>
        <S.Vertical>
          <S.NpcImage
            draggable="false"
            src={`https://maplestory.io/api/${import.meta.env.VITE_REGION}/${
              import.meta.env.VITE_VERSION
            }/npc/1010100/icon`}
            // style={{ height: 40, width: 40 }}
            className="no-drag"
            onClick={() => onToggleWindow('EquipmentStore')}
          />
          <div>장비상점</div>
        </S.Vertical>
      </S.Horizontal>
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
      <EquipmentStore />
      <StarForce />
    </S.Contianer>
  )
}

export default App
