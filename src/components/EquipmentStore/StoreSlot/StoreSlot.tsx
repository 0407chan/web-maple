import message from 'antd/lib/message'
import { getEquipment } from 'api/equipment'
import MapleButton from 'components/common/MapleButton'
import useInventory from 'hooks/useInventory'
import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { EquipmentItemListType } from 'types/equipment'
import { transDtoToType } from 'utils/dtoTransUtil'
import * as S from './style'

export type StoreItemType = Pick<EquipmentItemListType, 'id' | 'name'>
type StoreSlotProps = {
  item: StoreItemType
  searchKey: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  button?: React.ReactNode
}
const StoreSlot: React.FC<StoreSlotProps> = ({
  item,
  searchKey,
  onClick,
  button
}) => {
  let timer: any = undefined
  const { onAddEquipment, getEmptySlot } = useInventory()
  const [loading, setLoading] = useState<boolean>(false)

  const onPurchaseItem = async () => {
    setLoading(true)
    try {
      const newItem = await getEquipment({ itemId: item.id })
      // console.log(getEmptySlot())
      const emptySlot = getEmptySlot()
      if (emptySlot) {
        onAddEquipment({ ...emptySlot, item: transDtoToType(newItem) })
        message.success(`[${newItem.description.name}]을 구매했습니다`, 2)
      } else {
        message.error('인벤토리가 꽉 찼습니다', 2)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
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
    <S.Container onClick={onClick || onClickHandler}>
      <S.Horizontal>
        <S.ImageWrapper>
          <S.Image
            src={`https://maplestory.io/api/${import.meta.env.VITE_REGION}/${
              import.meta.env.VITE_VERSION
            }/item/${item.id}/icon`}
          />
        </S.ImageWrapper>
        <S.TextWrapper>
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc60a',
              fontWeight: 'bold',
              padding: 0
            }}
            caseSensitive
            searchWords={[searchKey]}
            autoEscape
            textToHighlight={item.name}
          />
        </S.TextWrapper>
        {button || (
          <MapleButton size="small" loading={loading} onClick={onPurchaseItem}>
            구매
          </MapleButton>
        )}
      </S.Horizontal>
    </S.Container>
  )
}

export default StoreSlot
