import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { FlameSettingType, FlameType, StatusSettingType } from '@/types/flame'
import { EquipItemType, SlotType, StatusBase } from '@/types/inventory'
import React, { useRef, useState } from 'react'
import { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
import { v4 as uuid } from 'uuid'
import MapleButton from '../common/MapleButton'
import WindowContainer from '../common/WindowContainer'
import Slot from '../Inventory/Slot'
import Result from './Result'
import StatusSetting from './StatusSetting'
import * as S from './style'
import {
  calcAttack,
  calcDoubleBonusStat,
  calcSingleBonusStat,
  getFourArmorOption,
  getFourWeaponOption,
  getGrade,
  getNotUndefined
} from './utils'

// 2048716 강환불 Powerful Rebirth Flame
// 2048717 영환불 Eternal Rebirth Flame

const initFlameSlot: SlotType = {
  id: uuid(),
  isOpen: true
}

const FlameOfResurrection: React.FC = () => {
  let timer: any = undefined

  const { inventory, currentInventory, onUpdateInventorySlot } = useInventory()
  const { onHideTooltip } = useToolTip()
  const { equipment, onUpdateEquipSlot } = useEquipment()

  const [showResult, setShowResult] = useState<boolean>(true)
  const [showSetting, setShowSetting] = useState<boolean>(true)
  const [isAuto, setIsAuto] = useState<boolean>(false)
  const [interval2, setInterval2] = useState<NodeJS.Timer>()

  const intervalRef = useRef(interval2)
  const [isEternalAuto, setIsEternalAuto] = useState<boolean>(false)
  const [isPowerfulAuto, setIsPowerfulAuto] = useState<boolean>(false)
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 150,
    y: 200
  })

  const [flameSlot, setFlameSlot] = useState<SlotType>(initFlameSlot)

  const [mesoKrwSetting, setMesoKrwSetting] = useState<number | undefined>(3500)
  const [statusSetting, setStatusSetting] = useState<StatusSettingType>({})
  const [flameCostSetting, setFlameCostSetting] = useState<FlameSettingType>({
    POWERFUL: 50000000,
    ETERNAL: 100000000
  })
  const [flameResult, setFlameResult] = useState<Map<string, FlameSettingType>>(
    new Map()
  )

  const { item } = flameSlot

  const onDrop = (slot: any) => {
    setFlameSlot({ ...slot })
  }
  const isMySlot = (item: SlotType) => {
    return true
  }
  const isBonus = () => {
    if (!item) return false

    if (item.STR.bonus > 0) return true
    if (item.DEX.bonus > 0) return true
    if (item.INT.bonus > 0) return true
    if (item.LUK.bonus > 0) return true
    if (item.WEAPON_ATTACK.bonus > 0) return true
    if (item.MAGIC_ATTACK.bonus > 0) return true
    if (item.DEFENCE.bonus > 0) return true
    if (item.HP.bonus > 0) return true
    if (item.MP.bonus > 0) return true

    if (item.bossDemage.bonus > 0) return true
    if (item.IgnoreDefence.bonus > 0) return true
    if (item.RequierdLevel.bonus < 0) return true

    if (item.demage.bonus > 0) return true
    if (item.AllStat.bonus > 0) return true

    if (item.jump.bonus > 0) return true
    if (item.speed.bonus > 0) return true

    return false
  }

  const onAutoEternal = () => {
    if (isEternalAuto) {
      if (interval2) {
        clearInterval(interval2)
      }
      setIsEternalAuto(false)
    } else {
      const newInterval = setInterval(() => onFlame('ETERNAL'), 50)
      intervalRef.current = newInterval
      setInterval2(newInterval)
      setIsEternalAuto(true)
    }
  }
  const onAutoPowerful = () => {
    if (isPowerfulAuto) {
      if (interval2) {
        clearInterval(interval2)
      }
      setIsPowerfulAuto(false)
    } else {
      const newInterval = setInterval(() => onFlame('POWERFUL'), 50)
      intervalRef.current = newInterval
      setInterval2(newInterval)
      setIsPowerfulAuto(true)
    }
  }

  const onFlame = (type: FlameType) => {
    if (!item) return

    let res = flameResult.get(item.id)
    if (res) {
      const value = res[type]
      res = { ...res, [type]: value ? value + 1 : 0 + 1 }
      flameResult.set(item.id, res)
    } else {
      let other = 'ETERNAL'
      if (type === 'ETERNAL') {
        other = 'POWERFUL'
      }
      flameResult.set(item.id, { [type]: 1, [other]: 0 })
    }
    setFlameResult(flameResult)

    const options = new Set(
      item.islots === 'Wp' ? getFourWeaponOption() : getFourArmorOption()
    )
    // console.log(options)
    let newStr = options.has('STR') ? calcSingleBonusStat(type, item) : 0
    let newDex = options.has('DEX') ? calcSingleBonusStat(type, item) : 0
    let newInt = options.has('INT') ? calcSingleBonusStat(type, item) : 0
    let newLuk = options.has('LUK') ? calcSingleBonusStat(type, item) : 0
    const newBoss = options.has('boss_demage') ? getGrade(type, item) * 2 : 0
    const newAll = options.has('AllStat') ? getGrade(type, item) : 0
    const newDemage = options.has('demage') ? getGrade(type, item) : 0

    const tempGrade = (getGrade(type, item) - 2) as 1 | 2 | 3 | 4 | 5
    const newWeaponAttack = options.has('WEAPON_ATTACK')
      ? item.islots === 'Wp'
        ? Math.ceil(
            (item.WEAPON_ATTACK.base * calcAttack(item, tempGrade)) / 100
          )
        : getGrade(type, item)
      : 0
    const newMagicAttack = options.has('MAGIC_ATTACK')
      ? item.islots === 'Wp'
        ? Math.ceil(
            ((item.MAGIC_ATTACK.base || item.WEAPON_ATTACK.base) *
              calcAttack(item, getGrade(type, item) as 1 | 2 | 3 | 4 | 5)) /
              100
          )
        : getGrade(type, item)
      : 0
    const newHP = options.has('MaxHP')
      ? item.level * 3 * getGrade(type, item)
      : 0
    const newMP = options.has('MaxMP')
      ? item.level * 3 * getGrade(type, item)
      : 0

    const newJump = options.has('jump') ? getGrade(type, item) : 0
    const newSpeed = options.has('move_speed') ? getGrade(type, item) : 0
    const newRequierdLevel = options.has('RequierdLevel')
      ? getGrade(type, item) * -5
      : 0

    const newDefence = options.has('DEFENCE')
      ? calcSingleBonusStat(type, item)
      : 0

    if (options.has('STR+DEX')) {
      const value = calcDoubleBonusStat(type, item)
      newStr += value
      newDex += value
    }
    if (options.has('STR+INT')) {
      const value = calcDoubleBonusStat(type, item)
      newStr += value
      newInt += value
    }
    if (options.has('STR+LUK')) {
      const value = calcDoubleBonusStat(type, item)
      newStr += value
      newLuk += value
    }
    if (options.has('DEX+INT')) {
      const value = calcDoubleBonusStat(type, item)
      newDex += value
      newInt += value
    }
    if (options.has('DEX+LUK')) {
      const value = calcDoubleBonusStat(type, item)
      newDex += value
      newLuk += value
    }
    if (options.has('INT+LUK')) {
      const value = calcDoubleBonusStat(type, item)
      newInt += value
      newLuk += value
    }

    const newItem: EquipItemType = {
      ...item,
      STR: { ...item.STR, bonus: newStr },
      DEX: { ...item.DEX, bonus: newDex },
      INT: { ...item.INT, bonus: newInt },
      LUK: { ...item.LUK, bonus: newLuk },
      bossDemage: { ...item.bossDemage, bonus: newBoss },
      AllStat: { ...item.AllStat, bonus: newAll },
      demage: { ...item.demage, bonus: newDemage },
      WEAPON_ATTACK: { ...item.WEAPON_ATTACK, bonus: newWeaponAttack },
      MAGIC_ATTACK: { ...item.MAGIC_ATTACK, bonus: newMagicAttack },
      HP: { ...item.HP, bonus: newHP },
      MP: { ...item.MP, bonus: newMP },
      jump: { ...item.jump, bonus: newJump },
      speed: { ...item.speed, bonus: newSpeed },
      RequierdLevel: { ...item.RequierdLevel, bonus: newRequierdLevel },
      DEFENCE: { ...item.DEFENCE, bonus: newDefence }
    }
    checkForAuto(type, newItem)
    setFlameSlot({ ...flameSlot, item: newItem })
    setItemOnOriginalSlot(newItem)
  }

  const checkForAuto = (type: FlameType, newItem: EquipItemType) => {
    if (intervalRef.current === undefined) return
    let result = false

    const definedKeys = getNotUndefined(statusSetting)

    for (let i = 0; i < definedKeys.length; i++) {
      const key = definedKeys[i]
      const newKey: keyof EquipItemType = key
      const status = statusSetting[key]
      if (status && status <= newItem[newKey].bonus) {
        result = true
      } else {
        result = false
        break
      }
    }
    if (result || definedKeys.length === 0) {
      clearInterval(intervalRef.current)
      if (type === 'ETERNAL') {
        setIsEternalAuto(false)
      } else {
        setIsPowerfulAuto(false)
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

  const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clearTimeout(timer)
    if (event.detail === 1) {
      timer = setTimeout(() => {
        console.log('싱글 클릭')
      }, 200)
    } else if (event.detail === 2) {
      if (flameSlot.item) {
        setFlameSlot(initFlameSlot)
        onHideTooltip()
      }
    }
  }
  const onControlledDrag = (e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data
    setPosition({ x, y })
  }

  return (
    <>
      <WindowContainer
        title="FLAME OF RESURRECTION"
        windowType="FlameOfResurrection"
        onDrag={onControlledDrag}
        position={position}
        footer={
          <S.Horizontal>
            <S.Horizontal>
              <MapleButton
                onClick={() =>
                  isAuto ? onAutoPowerful() : onFlame('POWERFUL')
                }
                style={{ padding: '20px 15px' }}
                disabled={item === undefined || isEternalAuto}
              >
                <img
                  src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                  alt="powerImage"
                />
                강환불
              </MapleButton>
              <MapleButton
                // loading={isEternalAuto}
                onClick={() => (isAuto ? onAutoEternal() : onFlame('ETERNAL'))}
                style={{ padding: '20px 15px' }}
                icon={
                  <img
                    src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                    alt="foreverImage"
                  />
                }
                disabled={item === undefined || isPowerfulAuto}
              >
                영환불
              </MapleButton>
            </S.Horizontal>
          </S.Horizontal>
        }
      >
        <S.Contianer>
          <Slot
            slot={flameSlot}
            onDrop={onDrop}
            isMySlot={isMySlot}
            onClick={onItemClick}
            isCanDrop={false}
          />
          {flameSlot.item === undefined ? (
            <S.Result>추가옵션을 변경할 아이템을 드래그해주세요.</S.Result>
          ) : (
            <>
              {isBonus() ? (
                <S.Result>
                  {renderStat('STR')}
                  {renderStat('DEX')}
                  {renderStat('INT')}
                  {renderStat('LUK')}
                  {renderStat('HP')}
                  {renderStat('MP')}
                  {renderStat('WEAPON_ATTACK')}
                  {renderStat('MAGIC_ATTACK')}
                  {renderStat('DEFENCE')}
                  {renderStat('speed')}
                  {renderStat('jump')}
                  {renderStat('bossDemage', true)}
                  {renderStat('IgnoreDefence', true)}
                  {renderStat('demage', true)}
                  {renderStat('AllStat', true)}
                  {item && item.RequierdLevel.bonus < 0 && (
                    <div>
                      {item.RequierdLevel.label} : {item.RequierdLevel.bonus}
                    </div>
                  )}
                </S.Result>
              ) : (
                <S.Result>
                  <div>추가 능력이 없습니다.</div>
                  <div> 버튼을 눌러 추가 능력을 부여해주세요.</div>
                </S.Result>
              )}
            </>
          )}
          <S.Horizontal>
            <MapleButton onClick={() => setShowSetting(!showSetting)}>
              세팅
            </MapleButton>
            <S.Checkbox
              checked={isAuto}
              onChange={(event) => {
                if (event.target.checked === false && intervalRef.current) {
                  clearInterval(intervalRef.current)
                }
                setIsAuto(event.target.checked)
              }}
            >
              <S.Title>자동</S.Title>
            </S.Checkbox>
            {/* <MapleButton onClick={() => setShowResult(!showResult)}>
              결과보기
            </MapleButton> */}
          </S.Horizontal>
        </S.Contianer>
      </WindowContainer>
      {showSetting && (
        <StatusSetting
          item={item}
          loading={isPowerfulAuto || isEternalAuto}
          statusSetting={statusSetting}
          setStatusSetting={setStatusSetting}
          flameCostSetting={flameCostSetting}
          setFlameCostSetting={setFlameCostSetting}
          mesoKrwSetting={mesoKrwSetting}
          setMesoKrwSetting={setMesoKrwSetting}
          position={position}
        />
      )}
      {showResult && (
        <Result
          item={item}
          flameResult={flameResult}
          setFlameResult={setFlameResult}
          flameCostSetting={flameCostSetting}
          mesoKrwSetting={mesoKrwSetting}
          position={position}
        />
      )}
    </>
  )

  function renderStat(key: keyof EquipItemType, isPercent?: boolean) {
    if (!item) return null
    const stat = item[key] as StatusBase
    const definedKeys = getNotUndefined(statusSetting)
    const isExist = definedKeys.find((definedKey) => definedKey === key)
    const status = isExist ? statusSetting[isExist] : undefined
    if (stat.bonus > 0) {
      return (
        <S.FlameStatLabel
          isMyStat={
            isExist !== undefined &&
            status !== undefined &&
            stat.bonus >= status
          }
        >
          {stat.label} : {stat.bonus}
          {isPercent === true ? '%' : ''}
        </S.FlameStatLabel>
      )
    }
  }
}

export default FlameOfResurrection
