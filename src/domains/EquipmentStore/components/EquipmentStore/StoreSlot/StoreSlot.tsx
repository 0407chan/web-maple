import message from 'antd/lib/message'
import Horizontal from 'components/common/Horizontal'
import MapleButton from 'components/common/MapleButton'
import {
  getEquipment,
  useGetEquipment
} from 'domains/EquipmentStore/apis/equipment.api'
import { EquipmentItemListType } from 'domains/EquipmentStore/types/equipment.types'
import useInventory from 'hooks/useInventory'
import useToolTip from 'hooks/useToolTip'
import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
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
  // let timer: any = undefined
  const { onAddEquipment, getEmptySlot, onSetCurrentItem } = useInventory()
  const [loading, setLoading] = useState<boolean>(false)

  const { onShowTooltip, onHideTooltip, onSetMousePosition } = useToolTip()

  const { data, refetch: handleFetchEquipment } = useGetEquipment({
    query: { itemId: item.id },
    options: {
      enabled: false,
      onSuccess: (data) => {
        onSetCurrentItem(transDtoToType(data))
        onShowTooltip()
      },
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10
    }
  })

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

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onSetMousePosition(event.clientX, event.clientY)
  }

  const handleHideTooltip = () => {
    onHideTooltip()
    onSetCurrentItem(undefined)
  }

  return (
    <S.Container
      onClick={onClick}
      // onMouseOverCapture={() => {
      //   handleFetchEquipment()
      // }}
      // onMouseOut={handleHideTooltip}
      // onMouseMove={setMousePosition}
    >
      <Horizontal gap="small" style={{ padding: '0px 8px' }}>
        <S.ImageWrapper>
          <S.Image
            alt="item-icon"
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
          <MapleButton
            style={{ marginRight: 4 }}
            size="small"
            loading={loading}
            onClick={onPurchaseItem}
          >
            구매
          </MapleButton>
        )}
      </Horizontal>
    </S.Container>
  )
}

export default StoreSlot
