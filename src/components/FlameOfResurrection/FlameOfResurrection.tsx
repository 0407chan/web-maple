import useInventory from '@/hooks/useInventory'
import useUiWindow from '@/hooks/useUiWindow'
import { EquipItemType, SlotType } from '@/types/inventory'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { v4 as uuid } from 'uuid'
import Slot from '../Inventory/Slot'
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

const FlameOfResurrection: React.FC = () => {
  const { isOpenedWindow, uiWindowList, onSetTop } = useUiWindow()
  const { inventory, currentInventory } = useInventory()
  const ref = useRef<HTMLDivElement>(null)
  const [flameSlot, setFlameSlot] = useState<SlotType>({
    id: uuid(),
    isOpen: true
  })

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
  }

  if (!isOpenedWindow('FlameOfResurrection')) return null
  return (
    <Draggable
      handle=".handle"
      bounds="body"
      defaultPosition={{
        x: document.body.clientWidth / 2 - 150,
        y: document.body.clientHeight / 2 - 200
      }}
    >
      <S.Contianer
        ref={ref}
        style={{
          zIndex:
            uiWindowList[uiWindowList.length - 1] === 'FlameOfResurrection'
              ? 1
              : undefined
        }}
        onClick={() => onSetTop('FlameOfResurrection')}
      >
        <S.Header className="handle">FLAME OF RESURRECTION</S.Header>
        <Slot slot={flameSlot} onDrop={onDrop} isMySlot={isMySlot} />
        {flameSlot.item === undefined ? (
          <S.Result>추가옵션을 변경할 아이템을 드래그해주세요.</S.Result>
        ) : (
          <>
            {isBonus() ? (
              <S.Result>
                {item && item.STR.bonus > 0 && (
                  <div>
                    {item.STR.label} : {item.STR.bonus}
                  </div>
                )}
                {item && item.DEX.bonus > 0 && (
                  <div>
                    {item.DEX.label} : {item.DEX.bonus}
                  </div>
                )}
                {item && item.INT.bonus > 0 && (
                  <div>
                    {item.INT.label} : {item.INT.bonus}
                  </div>
                )}
                {item && item.LUK.bonus > 0 && (
                  <div>
                    {item.LUK.label} : {item.LUK.bonus}
                  </div>
                )}
                {item && item.HP.bonus > 0 && (
                  <div>
                    {item.HP.label} : {item.HP.bonus}
                  </div>
                )}
                {item && item.MP.bonus > 0 && (
                  <div>
                    {item.MP.label} : {item.MP.bonus}
                  </div>
                )}
                {item && item.WEAPON_ATTACK.bonus > 0 && (
                  <div>
                    {item.WEAPON_ATTACK.label} : {item.WEAPON_ATTACK.bonus}
                  </div>
                )}
                {item && item.MAGIC_ATTACK.bonus > 0 && (
                  <div>
                    {item.MAGIC_ATTACK.label} : {item.MAGIC_ATTACK.bonus}
                  </div>
                )}
                {item && item.DEFENCE.bonus > 0 && (
                  <div>
                    {item.DEFENCE.label} : {item.DEFENCE.bonus}
                  </div>
                )}
                {item && item.speed.bonus > 0 && (
                  <div>
                    {item.speed.label} : {item.speed.bonus}
                  </div>
                )}
                {item && item.jump.bonus > 0 && (
                  <div>
                    {item.jump.label} : {item.jump.bonus}
                  </div>
                )}
                {item && item.bossDemage.bonus > 0 && (
                  <div>
                    {item.bossDemage.label} : {item.bossDemage.bonus}%
                  </div>
                )}
                {item && item.IgnoreDefence.bonus > 0 && (
                  <div>
                    {item.IgnoreDefence.label} : {item.IgnoreDefence.bonus}%
                  </div>
                )}
                {item && item.demage.bonus > 0 && (
                  <div>
                    {item.demage.label} : {item.demage.bonus}%
                  </div>
                )}
                {item && item.AllStat.bonus > 0 && (
                  <div>
                    {item.AllStat.label} : {item.AllStat.bonus}%
                  </div>
                )}
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

        <S.Footer>
          <S.Horizontal>
            <S.Button onClick={onPowerfulFlame}>
              <img
                src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                alt="powerImage"
              />
              강환불
            </S.Button>
            <S.Button onClick={onEternalFlame}>
              <img
                src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                alt="foreverImage"
              />
              영환불
            </S.Button>
          </S.Horizontal>
        </S.Footer>
      </S.Contianer>
    </Draggable>
  )
}

export default FlameOfResurrection
