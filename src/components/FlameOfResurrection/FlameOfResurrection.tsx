import useInventory from '@/hooks/useInventory'
import useUiWindow from '@/hooks/useUiWindow'
import { EquipItemType, SlotType } from '@/types/inventory'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { v4 as uuid } from 'uuid'
import Slot from '../Inventory/Slot'
import * as S from './style'
import {
  calcSingleBonusStatEternal,
  calcSingleBonusStatPowerful
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
    if (item.AllStat.bonus > 0) return true

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
    const newItem: EquipItemType = {
      ...item,
      STR: { ...item.STR, bonus: calcSingleBonusStatEternal(item) },
      DEX: { ...item.DEX, bonus: calcSingleBonusStatEternal(item) },
      INT: { ...item.INT, bonus: calcSingleBonusStatEternal(item) },
      LUK: { ...item.LUK, bonus: calcSingleBonusStatEternal(item) }
    }
    setFlameSlot({ ...flameSlot, item: newItem })
  }

  const getGrade = (status: number) => {
    if (item === undefined) return

    return 8 - Math.round((status - 2) / (item.level / 20 + 1))
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
      <S.Contianer ref={ref}>
        <S.Header className="handle">FLAME OF RESURRECTION</S.Header>
        <S.Body>
          <Slot slot={flameSlot} onDrop={onDrop} isMySlot={isMySlot} />
        </S.Body>
        {flameSlot.item === undefined ? (
          <S.Result>추가옵션을 변경할 아이템을 드래그해주세요.</S.Result>
        ) : (
          <>
            {isBonus() ? (
              <S.Result>
                {item && item.STR.bonus > 0 && (
                  <div>
                    STR : {item.STR.bonus} {`(${getGrade(item.STR.bonus)}추)`}
                  </div>
                )}
                {item && item.DEX.bonus > 0 && (
                  <div>
                    DEX : {item.DEX.bonus} {`(${getGrade(item.DEX.bonus)}추)`}
                  </div>
                )}
                {item && item.INT.bonus > 0 && (
                  <div>
                    INT : {item.INT.bonus} {`(${getGrade(item.INT.bonus)}추)`}
                  </div>
                )}
                {item && item.LUK.bonus > 0 && (
                  <div>
                    LUK : {item.LUK.bonus} {`(${getGrade(item.LUK.bonus)}추)`}
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
                {item && item.AllStat.bonus > 0 && (
                  <div>올스텟 : {item.AllStat.bonus}</div>
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
