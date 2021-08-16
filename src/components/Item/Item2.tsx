import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipType } from '@/types/inventory'
import React from 'react'
import * as S from './style'

type ItemProps = {
  item?: EquipType
}
const Item2: React.FC<ItemProps> = (props) => {
  const { item } = props
  const { visible, onShowTooltip, onHideTooltip, onSetMousePosition } =
    useToolTip()
  const { onSetCurrentItem } = useInventory()

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  const setDispalyVisibleAction = () => {
    if (item?.id === -1) return
    onSetCurrentItem(item)
    onShowTooltip()
  }

  const setDispalyNoneAction = () => {
    if (item?.id === -1) return
    onHideTooltip()
    onSetCurrentItem(undefined)
  }

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (item?.id === -1) return
    onSetMousePosition(event.clientX, event.clientY)
  }

  return (
    <S.Contianer
      onMouseOver={setDispalyVisibleAction}
      onMouseOut={setDispalyNoneAction}
      onMouseMove={setMousePosition}
    >
      {item && item.id > -1 && (
        <S.ItemImage
          src={item.image}
          alt="itemImage"
          onDragStart={preventDragHandler}
        />
      )}
    </S.Contianer>
  )
}

export default Item2
