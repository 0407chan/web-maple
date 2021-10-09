import useEquipment from '@/hooks/useEquipment'
import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
import { StatusSettingType } from '@/types/flame'
import { EquipItemType, SlotType, StatusBase } from '@/types/inventory'
import React, { useState } from 'react'
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
  calcDoubleBonusStatEternal,
  calcSingleBonusStatEternal,
  calcSingleBonusStatPowerful,
  getEternalGrade,
  getFourArmorOption,
  getFourWeaponOption,
  getGrade
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
  const [statusSetting, setStatusSetting] = useState<StatusSettingType>({})
  const [position, setPosition] = useState<ControlPosition>({
    x: document.body.clientWidth / 2 - 150,
    y: document.body.clientHeight / 2 - 200
  })

  const [flameSlot, setFlameSlot] = useState<SlotType>(initFlameSlot)
  const [flameResult, setFlameResult] = useState<
    Map<string, { power: number; eternal: number }>
  >(new Map())

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

  // 스텟 = (렙 / 20 + 1) * (3,4,5,6,7)
  const onPowerfulFlame = () => {
    if (!item) return

    let res = flameResult.get(item.id)
    if (res) {
      res = { ...res, power: res.power + 1 }
      flameResult.set(item.id, res)
    } else {
      flameResult.set(item.id, { eternal: 0, power: 1 })
    }
    setFlameResult(flameResult)

    const newItem: EquipItemType = {
      ...item,
      STR: { ...item.STR, bonus: calcSingleBonusStatPowerful(item) },
      DEX: { ...item.DEX, bonus: calcSingleBonusStatPowerful(item) },
      INT: { ...item.INT, bonus: calcSingleBonusStatPowerful(item) },
      LUK: { ...item.LUK, bonus: calcSingleBonusStatPowerful(item) }
    }

    setFlameSlot({ ...flameSlot, item: newItem })
  }

  const onEternalFlame = () => {
    if (!item) return

    let res = flameResult.get(item.id)
    if (res) {
      res = { ...res, eternal: res.eternal + 1 }
      flameResult.set(item.id, res)
    } else {
      flameResult.set(item.id, { eternal: 1, power: 0 })
    }
    setFlameResult(flameResult)

    const options = new Set(
      item.islots === 'Wp' ? getFourWeaponOption() : getFourArmorOption()
    )
    console.log(options)
    let newStr = options.has('STR') ? calcSingleBonusStatEternal(item) : 0
    let newDex = options.has('DEX') ? calcSingleBonusStatEternal(item) : 0
    let newInt = options.has('INT') ? calcSingleBonusStatEternal(item) : 0
    let newLuk = options.has('LUK') ? calcSingleBonusStatEternal(item) : 0
    const newBoss = options.has('boss_demage')
      ? getGrade('ETERNAL', item) * 2
      : 0
    const newAll = options.has('AllStat') ? getGrade('ETERNAL', item) : 0
    const newDemage = options.has('demage') ? getGrade('ETERNAL', item) : 0

    const tempGrade = getEternalGrade() as 1 | 2 | 3 | 4 | 5
    const newWeaponAttack = options.has('WEAPON_ATTACK')
      ? item.islots === 'Wp'
        ? Math.ceil(
            (item.WEAPON_ATTACK.base * calcAttack(item, tempGrade)) / 100
          )
        : getGrade('ETERNAL', item)
      : 0
    const newMagicAttack = options.has('MAGIC_ATTACK')
      ? item.islots === 'Wp'
        ? Math.ceil(
            ((item.MAGIC_ATTACK.base || item.WEAPON_ATTACK.base) *
              calcAttack(item, getEternalGrade() as 1 | 2 | 3 | 4 | 5)) /
              100
          )
        : getGrade('ETERNAL', item)
      : 0
    const newHP = options.has('MaxHP')
      ? item.level * 3 * getGrade('ETERNAL', item)
      : 0
    const newMP = options.has('MaxMP')
      ? item.level * 3 * getGrade('ETERNAL', item)
      : 0

    const newJump = options.has('jump') ? getGrade('ETERNAL', item) : 0
    const newSpeed = options.has('move_speed') ? getGrade('ETERNAL', item) : 0
    const newRequierdLevel = options.has('RequierdLevel')
      ? getGrade('ETERNAL', item) * -5
      : 0

    const newDefence = options.has('DEFENCE')
      ? calcSingleBonusStatEternal(item)
      : 0

    if (options.has('STR+DEX')) {
      const value = calcDoubleBonusStatEternal(item)
      newStr += value
      newDex += value
    }
    if (options.has('STR+INT')) {
      const value = calcDoubleBonusStatEternal(item)
      newStr += value
      newInt += value
    }
    if (options.has('STR+LUK')) {
      const value = calcDoubleBonusStatEternal(item)
      newStr += value
      newLuk += value
    }
    if (options.has('DEX+INT')) {
      const value = calcDoubleBonusStatEternal(item)
      newDex += value
      newInt += value
    }
    if (options.has('DEX+LUK')) {
      const value = calcDoubleBonusStatEternal(item)
      newDex += value
      newLuk += value
    }
    if (options.has('INT+LUK')) {
      const value = calcDoubleBonusStatEternal(item)
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
    setFlameSlot({ ...flameSlot, item: newItem })
    setItemOnOriginalSlot(newItem)
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
                onClick={onPowerfulFlame}
                style={{ padding: '20px 15px' }}
                disabled={item === undefined}
              >
                <img
                  src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                  alt="powerImage"
                />
                강환불
              </MapleButton>
              <MapleButton
                onClick={onEternalFlame}
                style={{ padding: '20px 15px' }}
                icon={
                  <img
                    src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                    alt="foreverImage"
                  />
                }
                disabled={item === undefined}
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
            {/* <MapleButton onClick={() => setShowResult(!showResult)}>
              결과보기
            </MapleButton> */}
          </S.Horizontal>
        </S.Contianer>
      </WindowContainer>
      {showSetting && (
        <StatusSetting
          item={item}
          statusSetting={statusSetting}
          setStatusSetting={setStatusSetting}
          position={position}
        />
      )}
      {showResult && (
        <Result item={item} flameResult={flameResult} position={position} />
      )}
    </>
  )

  function renderStat(key: keyof EquipItemType, isPercent?: boolean) {
    if (!item) return null
    const stat = item[key] as StatusBase
    if (stat.bonus > 0) {
      return (
        <div>
          {stat.label} : {stat.bonus}
          {isPercent === true ? '%' : ''}
        </div>
      )
    }
  }
}

export default FlameOfResurrection
