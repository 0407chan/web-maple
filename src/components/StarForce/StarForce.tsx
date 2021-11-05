import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { EquipItemType, SlotType } from '@/types/inventory'
import { StarForceSetting } from '@/types/star-force'
import IMAGE from '@/utils/images'
import { numberWithCommas } from '@/utils/number/numberWithCommas'
import Checkbox from 'antd/lib/checkbox'
import React, { useRef, useState } from 'react'
import { ControlPosition } from 'react-draggable'
import { v4 as uuid } from 'uuid'
import MapleButton from '../common/MapleButton'
import WindowContainer from '../common/WindowContainer'
import { getRandomNum } from '../FlameOfResurrection/utils'
import Slot from '../Inventory/Slot'
import { getStarForceCost, getSuccessRate } from './constants'
import Result from './Result'
import StatusSetting from './StatusSetting'
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
  const [isAuto, setIsAuto] = useState<boolean>(false)
  const [isStarForceRunning, setIsStarForceRunning] = useState<boolean>(false)
  const [autoTimer, setAutoTimer] = useState<NodeJS.Timer>()

  const intervalRef = useRef(autoTimer)
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 150,
    y: 200
  })
  const [mesoKrwSetting, setMesoKrwSetting] = useState<number | undefined>(3500)
  const [starForceSlot, setStarForceSlot] = useState<SlotType>(initSlot)
  const [starForceSetting, setStarForceSetting] = useState<StarForceSetting>({
    star: 22,
    itemCost: 100000000,
    exchangeRate: 3500
  })
  const slotRef = useRef(starForceSlot)
  const updateSlotItem = (newItem: EquipItemType) => {
    slotRef.current = { ...slotRef.current, item: newItem }
    setStarForceSlot({ ...slotRef.current, item: newItem })
  }

  const [starForceResult, setStarForceResult] = useState<
    Map<string, { destroyed: number; cost: number }>
  >(new Map())
  const resultRef = useRef(starForceResult)

  const onDrop = (slot: any) => {
    slotRef.current = slot
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
      if (slotRef.current.item) {
        slotRef.current = initSlot
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
    if (slotRef.current.item === undefined) return null
    const result = []
    for (let i = 0; i < slotRef.current.item.maxStar; i++) {
      // const starImage =
      // currentItem.isSuperior
      //   ? IMAGE.tooltip.tooltip_Item_Star_blue
      //   : IMAGE.tooltip.tooltip_Item_Star
      const imageSrc =
        i < slotRef.current.item.star
          ? IMAGE.tooltip.tooltip_Item_Star
          : IMAGE.tooltip.tooltip_Item_Star_none
      result.push(
        <S.StarImage
          src={imageSrc}
          key={`star-${i}`}
          width={13}
          alt={`starimg-` + i}
        />
      )
      if (i % 5 === 4 && i !== slotRef.current.item.maxStar - 1) {
        result.push(<span key={`space-${i}`} style={{ marginRight: 6 }} />)
      }
      if (i === 14 && i !== slotRef.current.item.maxStar - 1) {
        result.push(
          <div
            key={`linebreak-${i}`}
            style={{ height: '100%', paddingBottom: 10 }}
          />
        )
      }
    }
    return result
  }
  const isMaxStar = (): boolean => {
    return (
      slotRef.current.item !== undefined &&
      slotRef.current.item.star >= slotRef.current.item.maxStar
    )
  }

  const onStarForce = (isRunning = false) => {
    if (!slotRef.current.item) return
    if (isRunning && slotRef.current.item.isDestroyed) {
      onRecoverItem()
      return
    }
    const randomNum = Number((getRandomNum(1000) / 10).toFixed(1))
    const rate = getSuccessRate(slotRef.current.item.star)
    const success = rate.success
    const fail =
      rate.success +
      (rate.failDecrease > 0
        ? rate.failDecrease
        : 0 + rate.failMaintain > 0
        ? rate.failMaintain
        : 0)

    let tempItem: EquipItemType = { ...slotRef.current.item }

    // 성공
    if (randomNum <= success) {
      tempItem = { ...tempItem, star: tempItem.star + 1 }
    }
    // 실패
    else if (randomNum > success && randomNum <= fail) {
      if (rate.failDecrease > 0) {
        tempItem = { ...tempItem, star: tempItem.star - 1 }
      }
    }
    // 파괴
    else {
      tempItem = { ...tempItem, star: 12, isDestroyed: true }
    }

    //가격, 터진 횟수 누적
    let itemResult = starForceResult.get(slotRef.current.item.id)

    const starCost = getStarForceCost(slotRef.current.item)
    if (itemResult) {
      const cost = itemResult.cost
      const destroyed = itemResult.destroyed
      itemResult = {
        ...itemResult,
        cost: cost + starCost,
        destroyed: destroyed + (tempItem.isDestroyed ? 1 : 0)
      }
      starForceResult.set(slotRef.current.item.id, itemResult)
    } else {
      const newResult = {
        cost: starCost,
        destroyed: tempItem.isDestroyed ? 1 : 0
      }
      starForceResult.set(slotRef.current.item.id, newResult)
    }

    resultRef.current = starForceResult
    setStarForceResult(starForceResult)

    checkForAuto(tempItem)
    updateSlotItem(tempItem)
    setItemOnOriginalSlot(tempItem)
  }

  const checkForAuto = (newItem: EquipItemType) => {
    if (intervalRef.current === undefined) return

    if (
      (starForceSetting.star && newItem.star >= starForceSetting.star) ||
      isMaxStar()
    ) {
      clearInterval(intervalRef.current)
      setIsStarForceRunning(false)
    }
  }

  const onAutoStarForce = () => {
    if (isStarForceRunning) {
      if (autoTimer) {
        clearInterval(autoTimer)
      }
      setIsStarForceRunning(false)
    } else {
      const newInterval = setInterval(() => onStarForce(true), 50)
      intervalRef.current = newInterval
      setAutoTimer(newInterval)
      setIsStarForceRunning(true)
    }
  }

  const onRecoverItem = () => {
    if (!slotRef.current.item) return
    const tempItem: EquipItemType = {
      ...slotRef.current.item,
      isDestroyed: false
    }
    slotRef.current = { ...slotRef.current, item: tempItem }
    setItemOnOriginalSlot(tempItem)
  }

  return (
    <>
      <WindowContainer
        title="EQUIPMENT ENCHANT"
        windowType="EquipmentEnchant"
        onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
        onClose={() => setStarForceSlot(initSlot)}
        position={position}
      >
        <S.Contianer>
          {slotRef.current.item && (
            <S.StarWrapper>{renderStar()}</S.StarWrapper>
          )}
          <Slot
            slot={slotRef.current}
            onDrop={onDrop}
            isMySlot={isMySlot}
            onClick={onItemClick}
            className="star-force-slot"
            isCanDrop={false}
          />
          {slotRef.current.item && !isMaxStar() && (
            <S.Vertical>
              <S.Horizontal style={{ gap: 10 }}>
                <S.RateBlock>
                  <S.RateLabel>{`${
                    getSuccessRate(slotRef.current.item.star).success
                  }%`}</S.RateLabel>
                  <S.RateLabel rateType="SUCCESS">성공</S.RateLabel>
                </S.RateBlock>
                {getSuccessRate(slotRef.current.item.star).failMaintain > 0 && (
                  <S.RateBlock>
                    <S.RateLabel>{`${
                      getSuccessRate(slotRef.current.item.star).failMaintain
                    }%`}</S.RateLabel>
                    <S.RateLabel rateType="FAIL">실패(유지)</S.RateLabel>
                  </S.RateBlock>
                )}
                {getSuccessRate(slotRef.current.item.star).failDecrease > 0 && (
                  <S.RateBlock>
                    <S.RateLabel>{`${
                      getSuccessRate(slotRef.current.item.star).failDecrease
                    }%`}</S.RateLabel>
                    <S.RateLabel rateType="FAIL">실패(하락)</S.RateLabel>
                  </S.RateBlock>
                )}
                <S.RateBlock>
                  <S.RateLabel>{`${
                    getSuccessRate(slotRef.current.item.star).destroy
                  }%`}</S.RateLabel>
                  <S.RateLabel rateType="DESTROY">파괴</S.RateLabel>
                </S.RateBlock>
              </S.Horizontal>

              {/* <S.Horizontal style={{ gap: 10 }}>
              <S.RateBlock>
                <S.RateLabel
                  style={{
                    width: '100%',
                    textAlign: 'right',
                    paddingRight: 10
                  }}
                >
                  {tryRef.current.success}
                </S.RateLabel>
                <S.RateLabel rateType="SUCCESS">성공</S.RateLabel>
              </S.RateBlock>
              <S.RateBlock>
                <S.RateLabel
                  style={{
                    width: '100%',
                    textAlign: 'right',
                    paddingRight: 10
                  }}
                >
                  {tryRef.current.fail}
                </S.RateLabel>
                <S.RateLabel rateType="FAIL">실패</S.RateLabel>
              </S.RateBlock>
              <S.RateBlock>
                <S.RateLabel
                  style={{
                    width: '100%',
                    textAlign: 'right',
                    paddingRight: 10
                  }}
                >
                  {tryRef.current.destroy}
                </S.RateLabel>
                <S.RateLabel rateType="DESTROY">파괴</S.RateLabel>
              </S.RateBlock>
            </S.Horizontal> */}
            </S.Vertical>
          )}
          <S.Result>
            {slotRef.current.item ? (
              !isMaxStar() ? (
                <S.Vertical
                  style={{ justifyContent: 'space-between', height: '100%' }}
                >
                  <S.Horizontal>
                    {`${slotRef.current.item.star}성 > ${
                      slotRef.current.item.star + 1
                    }성`}
                  </S.Horizontal>
                  <S.Horizontal>
                    <S.Title style={{ fontSize: 18 }}>
                      {numberWithCommas(getStarForceCost(slotRef.current.item))}
                    </S.Title>
                  </S.Horizontal>
                </S.Vertical>
              ) : (
                <>
                  <div>장비가 한계까지 강화되어</div>
                  <div>더 이상 강화할 수 없습니다.</div>
                </>
              )
            ) : (
              <>스타포스 강화할 아이템을 선택해주세요</>
            )}
          </S.Result>
          <S.Horizontal>
            <Checkbox
              disabled={
                slotRef.current.item === undefined ||
                slotRef.current.item?.isDestroyed ||
                isMaxStar()
              }
              checked={isAuto}
              onChange={(event) => {
                if (event.target.checked === false && intervalRef.current) {
                  clearInterval(intervalRef.current)
                  setIsStarForceRunning(false)
                }
                setIsAuto(event.target.checked)
              }}
            >
              <S.Title>자동</S.Title>
            </Checkbox>
          </S.Horizontal>
          <S.Horizontal>
            {slotRef.current.item?.isDestroyed ? (
              <MapleButton onClick={onRecoverItem}>아이템 복구</MapleButton>
            ) : (
              <MapleButton
                disabled={
                  slotRef.current.item === undefined ||
                  slotRef.current.item?.isDestroyed ||
                  isMaxStar()
                }
                onClick={() => (isAuto ? onAutoStarForce() : onStarForce())}
              >
                <S.StarImage
                  isLoading={isStarForceRunning}
                  width={13}
                  src={IMAGE.tooltip.tooltip_Item_Star}
                  alt="star-force-image"
                />
                강화
              </MapleButton>
            )}
          </S.Horizontal>
        </S.Contianer>
      </WindowContainer>
      <Result
        item={starForceSlot.item}
        result={resultRef.current}
        setResult={setStarForceResult}
        // flameCostSetting={flameCostSetting}
        starForceSetting={starForceSetting}
        position={position}
      />
      <StatusSetting
        position={position}
        loading={isStarForceRunning}
        starForceSetting={starForceSetting}
        setStarForceSetting={setStarForceSetting}
        item={starForceSlot.item}
      />
    </>
  )
}

export default StarForce
