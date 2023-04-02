import { Radio, Spin, Typography } from 'antd'
import Input from 'antd/lib/input'
import Horizontal from 'components/common/Horizontal'
import MapleButton from 'components/common/MapleButton'
import Vertical from 'components/common/Vertical'
import WindowContainer from 'components/common/WindowContainer'
import { useGetEquipmentList } from 'domains/EquipmentStore/apis/equipment.api'
import {
  SubCategory,
  subCategoryName
} from 'domains/EquipmentStore/types/equipment.types'
import React, { useMemo, useRef, useState } from 'react'
import { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
import { IMAGE } from 'utils/images'
import InventorySection from './InventorySection'
import StoreSlot from './StoreSlot'
import * as S from './style'

type EquipmentStoreProps = {
  // handleDrop: (startSlot: SlotType, endSlot: EquipSlotType) => void
}

const EquipmentStore: React.FC<EquipmentStoreProps> = () => {
  const [searchKey, setSearchKey] = useState<string>('')
  const [maxCount, setMaxCount] = useState<number>(30)
  const ref = useRef<HTMLDivElement>(null)
  const [subCategory, setSubCategory] =
    useState<SubCategory>('One-Handed Sword')

  const storeItemListQuery = useGetEquipmentList({
    query: {
      overallCategoryFilter: 'Equip',
      cashFilter: false,
      subCategoryFilter: subCategory
    },
    options: {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10
    }
  })
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 200,
    y: 250
  })

  const searchedList = useMemo(
    () =>
      storeItemListQuery.data?.filter(
        (item) => item.name && item.name.indexOf(searchKey) !== -1
      ) ?? [],
    [searchKey, storeItemListQuery.data]
  )

  const onControlledDrag = (e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data
    setPosition({ x, y })
  }

  return (
    <>
      <WindowContainer
        hideCloseButton
        title="OPTIONS"
        windowType="EquipmentStore"
        position={{ ...position, x: position.x - 286 + 3 }}
        canDrag={false}
      >
        <Radio.Group
          buttonStyle="solid"
          size="small"
          optionType="button"
          onChange={(e) => {
            const value = e.target.value
            setSubCategory(value === 'ALL' ? undefined : value)
          }}
          value={subCategory === undefined ? 'ALL' : subCategory}
        >
          <Vertical gap="small" style={{ maxWidth: 250 }}>
            <Typography.Title level={5} style={{ color: '#eee', margin: 0 }}>
              무기
            </Typography.Title>
            <Horizontal gap="small" style={{ flexWrap: 'wrap' }}>
              <Radio.Button value="One-Handed Sword">
                {subCategoryName['One-Handed Sword']}
              </Radio.Button>
              <Radio.Button value="Two-Handed Sword">
                {subCategoryName['Two-Handed Sword']}
              </Radio.Button>
              <Radio.Button value="One-Handed Axe">
                {subCategoryName['One-Handed Axe']}
              </Radio.Button>
              <Radio.Button value="Two-Handed Axe">
                {subCategoryName['Two-Handed Axe']}
              </Radio.Button>
              <Radio.Button value="Spear">
                {subCategoryName['Spear']}
              </Radio.Button>
              <Radio.Button value="Pole Arm">
                {subCategoryName['Pole Arm']}
              </Radio.Button>
              <Radio.Button value="Staff">
                {subCategoryName['Staff']}
              </Radio.Button>
              <Radio.Button value="Katara">
                {subCategoryName['Katara']}
              </Radio.Button>
            </Horizontal>
            {/*  */}
            <Typography.Title level={5} style={{ color: '#eee', margin: 0 }}>
              방어구
            </Typography.Title>
            <Horizontal gap="small" style={{ flexWrap: 'wrap' }}>
              <Radio.Button value="Top">{subCategoryName['Top']}</Radio.Button>
              <Radio.Button value="Bottom">
                {subCategoryName['Bottom']}
              </Radio.Button>
              <Radio.Button value="Cape">
                {subCategoryName['Cape']}
              </Radio.Button>
              <Radio.Button value="Glove">
                {subCategoryName['Glove']}
              </Radio.Button>
              <Radio.Button value="Hat">{subCategoryName['Hat']}</Radio.Button>
              <Radio.Button value="Overall">
                {subCategoryName['Overall']}
              </Radio.Button>
              <Radio.Button value="Shield">
                {subCategoryName['Shield']}
              </Radio.Button>
              <Radio.Button value="Shoes">
                {subCategoryName['Shoes']}
              </Radio.Button>
            </Horizontal>
            {/*  */}
            <Typography.Title level={5} style={{ color: '#eee', margin: 0 }}>
              액세서리
            </Typography.Title>
            <Horizontal gap="small" style={{ flexWrap: 'wrap' }}>
              <Radio.Button value="Belt">
                {subCategoryName['Belt']}
              </Radio.Button>
              <Radio.Button value="Earrings">
                {subCategoryName['Earrings']}
              </Radio.Button>
              <Radio.Button value="Emblem">
                {subCategoryName['Emblem']}
              </Radio.Button>
              <Radio.Button value="Eye Decoration">
                {subCategoryName['Eye Decoration']}
              </Radio.Button>
              <Radio.Button value="Face Accessory">
                {subCategoryName['Face Accessory']}
              </Radio.Button>
              <Radio.Button value="Pendant">
                {subCategoryName['Pendant']}
              </Radio.Button>
              <Radio.Button value="Pocket Item">
                {subCategoryName['Pocket Item']}
              </Radio.Button>
              <Radio.Button value="Ring">
                {subCategoryName['Ring']}
              </Radio.Button>
              <Radio.Button value="Shoulder Accessory">
                {subCategoryName['Shoulder Accessory']}
              </Radio.Button>
            </Horizontal>

            <Typography.Title level={5} style={{ color: '#eee', margin: 0 }}>
              기타
            </Typography.Title>
            <Horizontal gap="small" style={{ flexWrap: 'wrap' }}>
              <Radio.Button value="ALL">전체</Radio.Button>
              <Radio.Button value="Order">
                {subCategoryName['Order']}
              </Radio.Button>
            </Horizontal>
          </Vertical>
        </Radio.Group>
      </WindowContainer>
      <WindowContainer
        title="EQUIPMENT STORE"
        // canDrag={false}
        onDrag={onControlledDrag}
        windowType="EquipmentStore"
        position={position}
      >
        <Vertical gap="small">
          <Input
            placeholder="구매할 아이템 이름을 입력해주세요."
            maxLength={10}
            value={searchKey}
            onChange={(event) => {
              setSearchKey(event.target.value)
            }}
          />
          <Spin
            spinning={storeItemListQuery.isFetching}
            size="large"
            tip={
              <Typography.Title
                level={5}
                style={{ color: '#ffffff', textShadow: 'unset' }}
              >
                로딩중...
              </Typography.Title>
            }
            indicator={
              <img
                width={50}
                draggable="false"
                alt="orange-mushroom"
                src={IMAGE.MUSHROOM}
              />
            }
          >
            <S.Container ref={ref}>
              {searchedList.slice(0, maxCount).map((item) => (
                <StoreSlot key={item.id} item={item} searchKey={searchKey} />
              ))}
              {searchedList.length > maxCount && (
                <MapleButton
                  style={{ margin: 10 }}
                  onClick={() => setMaxCount(maxCount + 30)}
                >
                  더 보기
                </MapleButton>
              )}
              {searchedList.length === 0 && (
                <S.EmptyContainer>
                  [<S.BoldText>{searchKey}</S.BoldText>] 는 존재하지 않습니다.
                </S.EmptyContainer>
              )}
            </S.Container>
          </Spin>
        </Vertical>
      </WindowContainer>
      <InventorySection position={position} />
    </>
  )
}

export default EquipmentStore
