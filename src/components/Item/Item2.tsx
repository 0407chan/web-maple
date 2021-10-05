import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { SlotType } from '@/types/inventory'
import React, { useEffect } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import * as S from './style'

type ItemProps = {
  slot: SlotType
  canDrag?: boolean
}
const Item2: React.FC<ItemProps> = ({ slot, canDrag }) => {
  const [collected, drag, preview] = useDrag(
    () => ({
      type: 'item',
      item: slot,
      canDrag: canDrag,
      collect: (monitor) => {
        return {
          opacity: monitor.isDragging() ? 0.4 : 1,
          isDragging: monitor.isDragging()
        }
      }
    }),
    [slot]
  )

  const { onShowTooltip, onHideTooltip, onSetMousePosition } = useToolTip()

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
    if (slot.item?.id === '') return
    onSetCurrentItem(slot.item)
    onShowTooltip()
  }

  const setDispalyNoneAction = () => {
    if (slot.item?.id === '') return
    onHideTooltip()
    onSetCurrentItem(undefined)
  }

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const tooltip = document.getElementById('new-tooltip')?.getClientRects()[0]

    let newX = event.clientX
    let newY = event.clientY
    if (
      document.body.clientWidth <
      event.clientX + (tooltip?.width || 300) + 3
    ) {
      newX = document.body.clientWidth - (tooltip?.width || 300) - 3
    }
    if (
      document.body.clientHeight <
      event.clientY + (tooltip?.height || 0) + 3
    ) {
      newY = document.body.clientHeight - (tooltip?.height || 0) - 3
    }
    onSetMousePosition(newX, newY)
  }

  if (slot.item === undefined) return null
  return (
    <>
      <DragPreviewImage connect={preview} src={slot.item.image} />
      <S.Contianer
        ref={drag}
        className="no-drag"
        onMouseOver={setDispalyVisibleAction}
        onMouseOut={setDispalyNoneAction}
        onMouseMove={setMousePosition}
        style={{ opacity: collected.opacity }}
      >
        <img src={slot.item.image} className="no-drag" alt="itemImage" />
      </S.Contianer>
    </>
  )
}

export default Item2
