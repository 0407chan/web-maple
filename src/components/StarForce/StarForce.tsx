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
import { getRandomNum } from '../FlameOfResurrection/utils'
import Slot from '../Inventory/Slot'
import { getSuccessRate } from './constants'
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

  const renderStar = () => {
    if (starForceSlot.item === undefined) return null
    const result = []
    for (let i = 0; i < starForceSlot.item.maxStar; i++) {
      // const starImage =
      // currentItem.isSuperior
      //   ? IMAGE.tooltip.tooltip_Item_Star_blue
      //   : IMAGE.tooltip.tooltip_Item_Star
      const imageSrc =
        i < starForceSlot.item.star
          ? IMAGE.tooltip.tooltip_Item_Star
          : IMAGE.tooltip.tooltip_Item_Star_none
      result.push(
        <img src={imageSrc} key={i} width={13} alt={`starimg-` + i} />
      )
      if (i % 5 === 4 && i !== starForceSlot.item.maxStar - 1) {
        result.push(<span style={{ marginRight: 6 }} />)
      }
      if (i === 14 && i !== starForceSlot.item.maxStar - 1) {
        result.push(<div style={{ height: '100%', paddingBottom: 10 }} />)
      }
    }
    return result
  }
  const isMaxStar = (): boolean => {
    return (
      starForceSlot.item !== undefined &&
      starForceSlot.item.star === starForceSlot.item.maxStar
    )
  }

  const onStarForce = () => {
    if (!starForceSlot.item) return
    const randomNum = Number((getRandomNum(1000) / 10).toFixed(1))
    const rate = getSuccessRate(starForceSlot.item.star)
    const success = rate.success
    // const success = 1
    const fail =
      rate.success +
      (rate.failDecrease > 0
        ? rate.failDecrease
        : 0 + rate.failMaintain > 0
        ? rate.failMaintain
        : 0)
    // const fail = 1

    let tempItem: EquipItemType = { ...starForceSlot.item }

    if (randomNum <= success) {
      console.log('성공')
      tempItem = { ...tempItem, star: tempItem.star + 1 }
    } else if (randomNum > success && randomNum <= fail) {
      console.log('실패')
      if (rate.failDecrease > 0) {
        tempItem = { ...tempItem, star: tempItem.star - 1 }
      }
    } else {
      tempItem = { ...tempItem, star: 12, isDestroyed: true }
      console.log('터짐')
    }

    setStarForceSlot({ ...starForceSlot, item: tempItem })
    setItemOnOriginalSlot(tempItem)
  }

  const onRecoverItem = () => {
    if (!starForceSlot.item) return
    const tempItem: EquipItemType = {
      ...starForceSlot.item,
      isDestroyed: false
    }
    setStarForceSlot({ ...starForceSlot, item: tempItem })
    setItemOnOriginalSlot(tempItem)
  }

  return (
    <WindowContainer
      title="EQUIPMENT ENCHANT"
      windowType="EquipmentEnchant"
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      onClose={() => setStarForceSlot(initSlot)}
      position={position}
    >
      <S.Contianer>
        {starForceSlot.item && <S.StarWrapper>{renderStar()}</S.StarWrapper>}
        <Slot
          slot={starForceSlot}
          onDrop={onDrop}
          isMySlot={isMySlot}
          onClick={onItemClick}
          className="star-force-slot"
          isCanDrop={false}
        />
        {starForceSlot.item && !isMaxStar() && (
          <S.Horizontal style={{ gap: 10 }}>
            <S.RateBlock>
              <S.RateLabel>{`${
                getSuccessRate(starForceSlot.item.star).success
              }%`}</S.RateLabel>
              <S.RateLabel rateType="SUCCESS">성공</S.RateLabel>
            </S.RateBlock>
            {getSuccessRate(starForceSlot.item.star).failMaintain > 0 && (
              <S.RateBlock>
                <S.RateLabel>{`${
                  getSuccessRate(starForceSlot.item.star).failMaintain
                }%`}</S.RateLabel>
                <S.RateLabel rateType="FAIL">실패(유지)</S.RateLabel>
              </S.RateBlock>
            )}
            {getSuccessRate(starForceSlot.item.star).failDecrease > 0 && (
              <S.RateBlock>
                <S.RateLabel>{`${
                  getSuccessRate(starForceSlot.item.star).failDecrease
                }%`}</S.RateLabel>
                <S.RateLabel rateType="FAIL">실패(하락)</S.RateLabel>
              </S.RateBlock>
            )}
            <S.RateBlock>
              <S.RateLabel>{`${
                getSuccessRate(starForceSlot.item.star).destroy
              }%`}</S.RateLabel>
              <S.RateLabel rateType="DESTROY">파괴</S.RateLabel>
            </S.RateBlock>
          </S.Horizontal>
        )}
        <S.Result>
          {starForceSlot.item ? (
            <>
              <S.Horizontal>
                {`${starForceSlot.item.star}성 > ${
                  starForceSlot.item.star + 1
                }성`}
              </S.Horizontal>
            </>
          ) : (
            <>스타포스 강화할 아이템을 선택해주세요</>
          )}
        </S.Result>
        {/* <S.Horizontal>
          <Checkbox
              // checked={isAuto}
              onChange={(event) => {
                if (event.target.checked === false && intervalRef.current) {
                  clearInterval(intervalRef.current)
                }
                setIsAuto(event.target.checked)
              }}
            >
              <S.Title>자동</S.Title>
            </Checkbox>
        </S.Horizontal> */}
        <S.Horizontal>
          <MapleButton
            disabled={
              starForceSlot.item === undefined ||
              starForceSlot.item?.isDestroyed
            }
            onClick={onStarForce}
          >
            <img
              width={13}
              src={IMAGE.tooltip.tooltip_Item_Star}
              alt="star-force-image"
            />
            강화
          </MapleButton>
          {starForceSlot.item?.isDestroyed && (
            <MapleButton onClick={onRecoverItem}>아이템 복구</MapleButton>
          )}
        </S.Horizontal>
      </S.Contianer>
    </WindowContainer>
  )
}

export default StarForce
