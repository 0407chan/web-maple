import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipType } from '@/types/inventory'
import React from 'react'
// import { EquipType } from "../modules/item/types";
import './Item.scss'

type ItemProps = {
  item?: EquipType
}
const Item: React.FC<ItemProps> = ({ item }) => {
  const { onShowPrevTooltip, onHidePrevTooltip, onSetMousePosition } =
    useToolTip()

  const { onSetCurrentItem } = useInventory()

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  const setDispalyVisibleAction = () => {
    onSetCurrentItem(item)
    onShowPrevTooltip()
  }

  const setDispalyNoneAction = () => {
    onHidePrevTooltip()
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
      {item && (
        <img
          src={item.image}
          className="item-img"
          // width={40}
          // height={38}
          onDragStart={preventDragHandler}
          alt="itemImage"
        />
      )}
    </div>
  )
}

export default Item
