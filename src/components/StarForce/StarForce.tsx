import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipItemType, SlotType } from '@/types/inventory'
import IMAGE from '@/utils/images'
import React, { useState } from 'react'
import { ControlPosition } from 'react-draggable'
import { v4 as uuid } from 'uuid'
import MapleButton from '../common/MapleButton'
import WindowContainer from '../common/WindowContainer'
import Slot from '../Inventory/Slot'
import * as S from './style'

const initSlot: SlotType = {
  id: uuid(),
  isOpen: true
}

const StarForce: React.FC = () => {
  let clickTimer: any = undefined
  const { inventory, currentInventory, onUpdateInventorySlot } = useInventory()
  const { equipment, onUpdateEquipSlot } = useEquipment()
  const { onHideTooltip } = useToolTip()
  const [showResult, setShowResult] = useState<boolean>(true)
  const [showSetting, setShowSetting] = useState<boolean>(true)
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 150,
    y: 200
  })
  const [starForceSlot, setStarForceSlot] = useState<SlotType>(initSlot)

  const onDrop = (slot: any) => {
    setStarForceSlot({ ...slot })
  }
  const isMySlot = (item: SlotType) => {
    return true
  }
  const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clearTimeout(clickTimer)
    if (event.detail === 1) {
      clickTimer = setTimeout(() => {
        console.log('싱글 클릭')
      }, 200)
    } else if (event.detail === 2) {
      if (starForceSlot.item) {
        setStarForceSlot(initSlot)
        onHideTooltip()
      }
    }
  }

  const setItemOnOriginalSlot = (newItem: EquipItemType) => {
    const equipSlot = equipment.find((slot) => slot.item?.id === newItem.id)
    if (equipSlot) {
      onUpdateEquipSlot({ ...equipSlot, item: newItem })
      return
    }

    const invenSlot = inventory[currentInventory].find(
      (slot) => slot.item?.id === newItem.id
    )
    if (invenSlot) {
      onUpdateInventorySlot({ ...invenSlot, item: newItem })
    }
  }

  const onStarForce = () => {
    console.log('가즈아')
  }

  return (
    <WindowContainer
      title="EQUIPMENT ENCHANT"
      windowType="EquipmentEnchant"
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      position={position}
    >
      <S.Contianer>
        <Slot
          slot={starForceSlot}
          onDrop={onDrop}
          isMySlot={isMySlot}
          onClick={onItemClick}
          className="star-force-slot"
          isCanDrop={false}
        />
        <S.Result>
          <S.Horizontal>
            {starForceSlot.item &&
              `${starForceSlot.item.star}성 > ${starForceSlot.item.star + 1}성`}
          </S.Horizontal>
          <S.Horizontal style={{ justifyContent: 'space-around' }}>
            <S.Vertical>
              <div>90%</div>
              <div>성공</div>
            </S.Vertical>
            <S.Vertical>
              <div>8%</div>
              <div>실패</div>
            </S.Vertical>
            <S.Vertical>
              <div>2%</div>
              <div>파괴</div>
            </S.Vertical>
          </S.Horizontal>
        </S.Result>
        <S.Horizontal>
          <MapleButton onClick={() => setShowSetting(!showSetting)}>
            세팅
          </MapleButton>
          {/* <Checkbox
              // checked={isAuto}
              onChange={(event) => {
                if (event.target.checked === false && intervalRef.current) {
                  clearInterval(intervalRef.current)
                }
                setIsAuto(event.target.checked)
              }}
            >
              <S.Title>자동</S.Title>
            </Checkbox> */}
        </S.Horizontal>
        <S.Horizontal>
          <MapleButton
            disabled={starForceSlot.item === undefined}
            onClick={onStarForce}
          >
            <img
              width={13}
              src={IMAGE.tooltip.tooltip_Item_Star}
              alt="star-force-image"
            />
            강화
          </MapleButton>
        </S.Horizontal>
      </S.Contianer>
    </WindowContainer>
  )
}

export default StarForce
