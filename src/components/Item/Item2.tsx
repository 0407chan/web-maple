import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { SlotType } from '@/types/inventory'
import React, { useEffect } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import * as S from './style'

type ItemProps = {
  slot: SlotType
}
const Item2: React.FC<ItemProps> = ({ slot }) => {
  const [collected, drag, preview] = useDrag(
    () => ({
      type: 'item',
      item: slot,
      collect: (monitor) => {
        return {
          opacity: monitor.isDragging() ? 0.4 : 1,
          isDragging: monitor.isDragging()
        }
      }
    }),
    [slot]
  )

  const { visible, onShowTooltip, onHideTooltip, onSetMousePosition } =
    useToolTip()

  const { onSetCurrentItem } = useInventory()

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (collected.isDragging) {
      onHideTooltip()
    }
  }, [collected.isDragging])

  const setDispalyVisibleAction = () => {
    if (slot.item?.id === -1) return
    onSetCurrentItem(slot.item)
    onShowTooltip()
  }

  const setDispalyNoneAction = () => {
    if (slot.item?.id === -1) return
    onHideTooltip()
    onSetCurrentItem(undefined)
  }

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (slot.item?.id === -1) return
    onSetMousePosition(event.clientX, event.clientY)
  }

  if (slot.item === undefined) return null
  return (
    <>
      <DragPreviewImage connect={preview} src={slot.item.image} />
      <S.Contianer
        ref={drag}
        onMouseOver={setDispalyVisibleAction}
        onMouseOut={setDispalyNoneAction}
        onMouseMove={setMousePosition}
        style={{ opacity: collected.opacity }}
      >
        <img src={slot.item.image} alt="itemImage" />
      </S.Contianer>
    </>
  )
}

export default Item2
