import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipType } from '@/types/inventory'
import React from 'react'
// import { EquipType } from "../modules/item/types";
import './Item.scss'
const Item: React.FC<EquipType> = (item) => {
  const { visible, onShowTooltip, onHideTooltip, onSetMousePosition } =
    useToolTip()
  const { onSetCurrentItem } = useInventory()

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  const setDispalyVisibleAction = () => {
    onSetCurrentItem(item)
    onShowTooltip()
  }

  const setDispalyNoneAction = () => {
    onHideTooltip()
    onSetCurrentItem(undefined)
  }

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onSetMousePosition(event.clientX, event.clientY)
  }

  return (
    <div
      className="item-wrapper"
      onMouseOver={setDispalyVisibleAction}
      onMouseOut={setDispalyNoneAction}
      onMouseMove={setMousePosition}
    >
      <img
        src={item.image}
        className="item-img"
        width={40}
        height={38}
        onDragStart={preventDragHandler}
        alt="itemImage"
      />
    </div>
  )
}

export default Item
