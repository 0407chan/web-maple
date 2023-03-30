import Input from 'antd/lib/input'
import MapleButton from 'components/common/MapleButton'
import Vertical from 'components/common/Vertical'
import WindowContainer from 'components/common/WindowContainer'
import { useGetEquipmentList } from 'domains/EquipmentStore/apis/equipment.api'
import React, { useMemo, useRef, useState } from 'react'
import { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
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
  const storeItemListQuery = useGetEquipmentList({
    query: {
      overallCategoryFilter: 'Equip',
      cashFilter: false
    },
    options: {}
  })
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 350,
    y: 200
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
        </Vertical>
      </WindowContainer>
      <InventorySection position={position} />
    </>
  )
}

export default EquipmentStore
