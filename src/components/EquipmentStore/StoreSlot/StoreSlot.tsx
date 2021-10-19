import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipmentItemListType } from '@/types/equipment'
import React from 'react'
import * as S from './style'

type StoreSlotProps = {
  item: EquipmentItemListType
  searchKey: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const StoreSlot: React.FC<StoreSlotProps> = ({ item, searchKey, onClick }) => {
  let timer: any = undefined
  const { equipment, onSetEquip } = useEquipment()
  const { onRemoveEquipItem, onAddEquipment } = useInventory()
  const { onHideTooltip } = useToolTip()

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
        <div>{item.name ? highlightDiv(item.name) : undefined}</div>
      </S.Horizontal>
    </S.Contianer>
  )
}

export default StoreSlot
