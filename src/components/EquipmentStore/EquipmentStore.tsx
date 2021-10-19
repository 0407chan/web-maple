import useItem from '@/hooks/useItem'
import { EquipmentItemListType } from '@/types/equipment'
import Input from 'antd/lib/input'
import React, { useEffect, useRef, useState } from 'react'
import MapleButton from '../common/MapleButton'
import WindowContainer from '../common/WindowContainer'
import StoreSlot from './StoreSlot'
import * as S from './style'

type EquipmentStoreProps = {
  // handleDrop: (startSlot: SlotType, endSlot: EquipSlotType) => void
}

const EquipmentStore: React.FC<EquipmentStoreProps> = () => {
  const { equipmentItemList } = useItem()
  const [searchKey, setSearchKey] = useState<string>('')
  const [searchedList, setSearchedList] =
    useState<EquipmentItemListType[]>(equipmentItemList)
  const [maxCount, setMaxCount] = useState<number>(30)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newArray = equipmentItemList.filter(
      (item) => item.name && item.name.indexOf(searchKey) !== -1
    )
    setSearchedList(newArray)
  }, [searchKey])

  return (
    <WindowContainer
      title="EQUIPMENT STORE"
      canDrag={false}
      hideCloseButton
      windowType="EquipmentStore"
      style={{ left: document.body.clientWidth / 2 - 150, top: 200 }}
    >
      <S.Vertical>
        <Input
          placeholder="구매할 아이템 이름을 입력해주세요."
          value={searchKey}
          onChange={(event) => {
            event.nativeEvent.cancelBubble = true
            setSearchKey(event.target.value)
          }}
        />
        <S.Contianer ref={ref}>
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
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )
}

export default EquipmentStore
