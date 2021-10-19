import useItem from '@/hooks/useItem'
import { EquipmentItemListType } from '@/types/equipment'
import Input from 'antd/lib/input'
import React, { useEffect, useState } from 'react'
import WindowContainer from '../common/WindowContainer'
import StoreSlot from './StoreSlot'
import * as S from './style'

type EquipmentStoreProps = {
  // handleDrop: (startSlot: SlotType, endSlot: EquipSlotType) => void
}

const EquipmentStore: React.FC<EquipmentStoreProps> = () => {
  const { equipmentItemList } = useItem()
  const [searchKey, setSearchKey] = useState<string>('')
  const [searchedList, setSearchedList] = useState<EquipmentItemListType[]>([])

  useEffect(() => {
    console.log('뭐나왕', equipmentItemList)
  }, [equipmentItemList])

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
          value={searchKey}
          onChange={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setSearchKey(event.target.value)
          }}
        />
        <S.Contianer>
          {searchedList.slice(0, 100).map((item) => (
            <StoreSlot key={item.id} item={item} searchKey={searchKey} />
          ))}
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )
}

export default EquipmentStore
