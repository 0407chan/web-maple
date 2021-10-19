import { getEquipment } from '@/api/equipment'
import MapleButton from '@/components/common/MapleButton'
import useInventory from '@/hooks/useInventory'
import { EquipmentItemListType } from '@/types/equipment'
import { transDtoToType } from '@/utils/dtoTransUtil'
import message from 'antd/lib/message'
import React from 'react'
import * as S from './style'

type StoreSlotProps = {
  item: EquipmentItemListType
  searchKey: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const StoreSlot: React.FC<StoreSlotProps> = ({ item, searchKey, onClick }) => {
  let timer: any = undefined
  const { onAddEquipment, getEmptySlot } = useInventory()

  const onPurchaseItem = async () => {
    const newItem = await getEquipment({ itemId: item.id })
    console.log(getEmptySlot())
    const emptySlot = getEmptySlot()
    if (emptySlot) {
      onAddEquipment({ ...emptySlot, item: transDtoToType(newItem) })
      message.success(`[${newItem.description.name}]을 구매했습니다`, 2)
    } else {
      message.error('인벤토리가 꽉 찼습니다', 2)
    }
  }

  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    clearTimeout(timer)
    if (event.detail === 1) {
      timer = setTimeout(() => {
        console.log(item.name)
      }, 200)
    } else if (event.detail === 2) {
      console.log('더블 클릭', item.name)
    }
  }

  const highlightDiv = (value: string) => {
    const replacedKeyowrd = searchKey.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    const parts = value.split(new RegExp(`(${replacedKeyowrd})`, 'gi'))
    return (
      <>
        {parts.map((part, idx) =>
          part.toLowerCase() === searchKey.toLowerCase() ? (
            <S.HighlightText key={idx}>{part}</S.HighlightText>
          ) : (
            <React.Fragment key={idx}>{part}</React.Fragment>
          )
        )}
      </>
    )
  }

  return (
    <S.Contianer onClick={onClick || onClickHandler}>
      <S.Horizontal>
        <S.ImageWrapper>
          <S.Image
            src={`https://maplestory.io/api/KMS/352/item/${item.id}/icon`}
          />
        </S.ImageWrapper>
        <S.TextWrapper>
          {item.name ? highlightDiv(item.name) : undefined}
        </S.TextWrapper>
        <MapleButton size="small" onClick={onPurchaseItem}>
          구매
        </MapleButton>
      </S.Horizontal>
    </S.Contianer>
  )
}

export default StoreSlot
