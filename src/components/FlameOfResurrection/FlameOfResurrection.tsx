import useEquipment from 'hooks/useEquipment'
import useInventory from 'hooks/useInventory'
import useToolTip from 'hooks/useToolTip'
import React, { useRef, useState } from 'react'
import { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
import {
  AutoType,
  FlameSettingType,
  FlameType,
  SimpleStatusSettingType,
  StatusSettingType
} from 'types/flame'
import {
  BonusDetail,
  EquipItemType,
  SlotType,
  StatusBase
} from 'types/inventory'
import { getWzVersion } from 'utils/wz-version.utils'
import { v4 as uuid } from 'uuid'
import Slot from '../Inventory/Slot'
import MapleButton from '../common/MapleButton'
import WindowContainer from '../common/WindowContainer'
import Result from './Result'
import StatusSetting from './StatusSetting'
import {
  BOSS_ITEM_FLAME_RATE,
  BOSS_ITEM_SECTION_RATE,
  NORMAL_ITEM_FLAME_RATE,
  NORMAL_ITEM_SECTION_RATE,
  WAEPON_LEVEL_SECTION,
  getZeroWeaponAttack,
  isZeroWeapon
} from './constants'
import * as S from './style'
import {
  getArmorOption,
  getDoubleStatDetail,
  getEmptyItem,
  getGrade,
  getHighestStatLabel,
  getNotUndefined,
  getRandomNum,
  getSingleStatDetail,
  getWeaponOption,
  isMasicAttack,
  isWeapon,
  roundToOne
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
  const [autoType, setAutoType] = useState<AutoType>('SIMPLE')

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
  const [simpleStatusSetting, setSimpleStatusSetting] =
    useState<SimpleStatusSettingType>({
      statType: 'STR',
      allStatPerStat: 10,
      attackPerStat: 4
    })
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
      item.islots === 'Wp'
        ? getWeaponOption(item.bossReward ? 4 : getRandomNum(4))
        : getArmorOption(item.bossReward ? 4 : getRandomNum(4))
    )
    // console.log(options)

    const tempItem: EquipItemType = getEmptyItem(item)

    if (options.has('STR')) {
      const detail = getSingleStatDetail(type, item)
      tempItem.STR = setNewSet(tempItem.STR, detail)
    }
    if (options.has('DEX')) {
      const detail = getSingleStatDetail(type, item)
      tempItem.DEX = setNewSet(tempItem.DEX, detail)
    }
    if (options.has('INT')) {
      const detail = getSingleStatDetail(type, item)
      tempItem.INT = setNewSet(tempItem.INT, detail)
    }
    if (options.has('LUK')) {
      const detail = getSingleStatDetail(type, item)
      tempItem.LUK = setNewSet(tempItem.LUK, detail)
    }
    if (options.has('boss_demage')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: grade * 2
      }
      tempItem.bossDemage = setNewSet(tempItem.bossDemage, detail)
    }
    if (options.has('AllStat')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: grade
      }
      tempItem.AllStat = setNewSet(tempItem.AllStat, detail)
    }
    if (options.has('demage')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: grade
      }
      tempItem.demage = setNewSet(tempItem.demage, detail)
    }

    if (options.has('WEAPON_ATTACK')) {
      const grade = getGrade(type, item)

      const levelSection = WAEPON_LEVEL_SECTION.get(item.level)
      let levelSectionRate = 0
      let flameRate = 0
      if (item.bossReward) {
        if (levelSection) {
          levelSectionRate = BOSS_ITEM_SECTION_RATE[levelSection]
        }
        flameRate = BOSS_ITEM_FLAME_RATE[grade as 7 | 6 | 5 | 4 | 3]
      }
      if (!item.bossReward) {
        if (levelSection) {
          levelSectionRate = NORMAL_ITEM_SECTION_RATE[levelSection]
        }
        flameRate = NORMAL_ITEM_FLAME_RATE[grade as 7 | 6 | 5 | 4 | 3 | 2 | 1]
      }

      let value = grade
      if (item.islots === 'Wp') {
        value = Math.ceil(
          (isZeroWeapon(item)
            ? getZeroWeaponAttack(item)
            : item.WEAPON_ATTACK.base) *
            levelSectionRate *
            flameRate
        )
      }
      tempItem.WEAPON_ATTACK = setNewSet(tempItem.WEAPON_ATTACK, {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: value
      })
    }

    if (options.has('MAGIC_ATTACK')) {
      const grade = getGrade(type, item)
      const levelSection = WAEPON_LEVEL_SECTION.get(item.level)
      let levelSectionRate = 0
      let flameRate = 0
      if (item.bossReward) {
        if (levelSection) {
          levelSectionRate = BOSS_ITEM_SECTION_RATE[levelSection]
        }
        flameRate = BOSS_ITEM_FLAME_RATE[grade as 7 | 6 | 5 | 4 | 3]
      }
      if (!item.bossReward) {
        if (levelSection) {
          levelSectionRate = NORMAL_ITEM_SECTION_RATE[levelSection]
        }
        flameRate = NORMAL_ITEM_FLAME_RATE[grade as 7 | 6 | 5 | 4 | 3 | 2 | 1]
      }

      let value = grade
      if (item.islots === 'Wp') {
        value = Math.ceil(
          (item.MAGIC_ATTACK.base ||
            (isZeroWeapon(item)
              ? getZeroWeaponAttack(item)
              : item.WEAPON_ATTACK.base)) *
            levelSectionRate *
            flameRate
        )
      }

      tempItem.MAGIC_ATTACK = setNewSet(tempItem.MAGIC_ATTACK, {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: value
      })
    }

    if (options.has('MaxHP')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: item.level * 3 * grade
      }
      tempItem.HP = setNewSet(tempItem.HP, detail)
    }
    if (options.has('MaxMP')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: item.level * 3 * grade
      }
      tempItem.MP = setNewSet(tempItem.MP, detail)
    }
    if (options.has('jump')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: grade
      }
      tempItem.jump = setNewSet(tempItem.jump, detail)
    }
    if (options.has('move_speed')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: grade
      }
      tempItem.speed = setNewSet(tempItem.speed, detail)
    }

    if (options.has('RequierdLevel')) {
      const grade = getGrade(type, item)
      const detail: BonusDetail = {
        grade: (item.bossReward ? 8 : 6) - grade,
        value: grade * -5
      }
      tempItem.RequierdLevel = setNewSet(tempItem.RequierdLevel, detail)
    }

    if (options.has('DEFENCE')) {
      const detail = getSingleStatDetail(type, item)
      tempItem.DEFENCE = setNewSet(tempItem.DEFENCE, detail)
    }

    if (options.has('STR+DEX')) {
      const detail = getDoubleStatDetail(type, item)
      tempItem.STR = setNewSet(tempItem.STR, detail)
      tempItem.DEX = setNewSet(tempItem.DEX, detail)
    }
    if (options.has('STR+INT')) {
      const detail = getDoubleStatDetail(type, item)
      tempItem.STR = setNewSet(tempItem.STR, detail)
      tempItem.INT = setNewSet(tempItem.INT, detail)
    }
    if (options.has('STR+LUK')) {
      const detail = getDoubleStatDetail(type, item)
      tempItem.STR = setNewSet(tempItem.STR, detail)
      tempItem.LUK = setNewSet(tempItem.LUK, detail)
    }
    if (options.has('DEX+INT')) {
      const detail = getDoubleStatDetail(type, item)
      tempItem.DEX = setNewSet(tempItem.DEX, detail)
      tempItem.INT = setNewSet(tempItem.INT, detail)
    }
    if (options.has('DEX+LUK')) {
      const detail = getDoubleStatDetail(type, item)
      tempItem.DEX = setNewSet(tempItem.DEX, detail)
      tempItem.LUK = setNewSet(tempItem.LUK, detail)
    }
    if (options.has('INT+LUK')) {
      const detail = getDoubleStatDetail(type, item)
      tempItem.INT = setNewSet(tempItem.INT, detail)
      tempItem.LUK = setNewSet(tempItem.LUK, detail)
    }

    if (autoType === 'DETAIL') {
      checkForAuto(type, tempItem)
    }
    if (autoType === 'SIMPLE') {
      checkForSimpleAuto(type, tempItem)
    }
    setFlameSlot({ ...flameSlot, item: tempItem })
    setItemOnOriginalSlot(tempItem)

    function setNewSet(stat: StatusBase, detail: BonusDetail) {
      return {
        ...stat,
        bonus: stat.bonus + detail.value,
        bonusDetail: stat.bonusDetail ? [...stat.bonusDetail, detail] : [detail]
      }
    }
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
  const getTotalStat = (newItem?: EquipItemType) => {
    const item = newItem || flameSlot.item
    if (!item) return 0

    let result = 0
    const highestStat = getHighestStat(item)
    if (simpleStatusSetting.statType === 'ALL') {
      result += highestStat.bonus
    }
    if (
      simpleStatusSetting.statType !== undefined &&
      simpleStatusSetting.statType !== 'ALL'
    ) {
      result += item[simpleStatusSetting.statType].bonus
    }
    if (
      simpleStatusSetting.attackPerStat &&
      simpleStatusSetting.attackPerStat > 0
    ) {
      if (
        simpleStatusSetting.statType === 'INT' ||
        highestStat.label === 'INT'
      ) {
        result += item.MAGIC_ATTACK.bonus * simpleStatusSetting.attackPerStat
      } else {
        result += item.WEAPON_ATTACK.bonus * simpleStatusSetting.attackPerStat
      }
    }
    if (
      simpleStatusSetting.allStatPerStat &&
      simpleStatusSetting.allStatPerStat > 0
    ) {
      result += item.AllStat.bonus * simpleStatusSetting.allStatPerStat
    }

    return roundToOne(`${result}`)

    function getHighestStat(item: EquipItemType) {
      const array: StatusBase[] = [item.STR, item.DEX, item.INT, item.LUK].sort(
        (a, b) => b.bonus - a.bonus
      )
      return array[0]
      // return Math.max(
      //   item.STR.bonus,
      //   item.DEX.bonus,
      //   item.LUK.bonus,
      //   item.INT.bonus
      // )
    }
  }
  const checkForSimpleAuto = (type: FlameType, newItem: EquipItemType) => {
    if (intervalRef.current === undefined) return
    if (isWeapon(newItem)) {
      if (
        isWeaponAttackStop(
          isMasicAttack(newItem) ? 'MAGIC_ATTACK' : 'WEAPON_ATTACK'
        ) &&
        isBossDemageStop() &&
        isDemageStop() &&
        isAllStatStop()
      ) {
        clearInterval(intervalRef.current)
        if (type === 'ETERNAL') {
          setIsEternalAuto(false)
        } else {
          setIsPowerfulAuto(false)
        }
      }
    } else {
      if (
        (simpleStatusSetting.expectStat &&
          simpleStatusSetting.expectStat <= getTotalStat(newItem)) ||
        !simpleStatusSetting.expectStat
      ) {
        clearInterval(intervalRef.current)
        if (type === 'ETERNAL') {
          setIsEternalAuto(false)
        } else {
          setIsPowerfulAuto(false)
        }
      }
    }

    function isWeaponAttackStop(key: 'WEAPON_ATTACK' | 'MAGIC_ATTACK') {
      const bonusDetail = newItem[key].bonusDetail
      if (simpleStatusSetting.attackGrage === undefined) return true
      return (
        bonusDetail !== undefined &&
        bonusDetail.length > 0 &&
        simpleStatusSetting.attackGrage >= bonusDetail[0].grade
      )
    }
    function isBossDemageStop() {
      if (simpleStatusSetting.bossGrade === undefined) return true
      return (
        newItem.bossDemage.bonusDetail !== undefined &&
        newItem.bossDemage.bonusDetail.length > 0 &&
        simpleStatusSetting.bossGrade >= newItem.bossDemage.bonusDetail[0].grade
      )
    }
    function isDemageStop() {
      if (simpleStatusSetting.demageGrade == undefined) return true
      return (
        newItem.demage.bonusDetail !== undefined &&
        newItem.demage.bonusDetail.length > 0 &&
        simpleStatusSetting.demageGrade >= newItem.demage.bonusDetail[0].grade
      )
    }
    function isAllStatStop() {
      if (simpleStatusSetting.allStatGrade === undefined) return true
      return (
        newItem.AllStat.bonusDetail !== undefined &&
        newItem.AllStat.bonusDetail.length > 0 &&
        simpleStatusSetting.allStatGrade >= newItem.AllStat.bonusDetail[0].grade
      )
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
                  src={`https://maplestory.io/api/${
                    import.meta.env.VITE_REGION
                  }/${getWzVersion()}/item/2048716/icon`}
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
                    src={`https://maplestory.io/api/${
                      import.meta.env.VITE_REGION
                    }/${getWzVersion()}/item/2048717/icon`}
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
        <S.Container>
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
                  <div style={{ width: '100%' }}>
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
                      <S.Horizontal
                        style={{
                          justifyContent: 'space-between',
                          width: '100%'
                        }}
                      >
                        <div>
                          {item.RequierdLevel.label} :{' '}
                          {item.RequierdLevel.bonus}
                        </div>
                        {item.RequierdLevel.bonusDetail &&
                          item.RequierdLevel.bonusDetail.length > 0 && (
                            <S.DetailWrapper>
                              {item.RequierdLevel.bonusDetail.map(
                                (detail, index) => (
                                  <S.FlameBonusDetailLabel
                                    key={index}
                                    grade={detail.grade}
                                  >
                                    {detail.value}({detail.grade})
                                  </S.FlameBonusDetailLabel>
                                )
                              )}
                            </S.DetailWrapper>
                          )}
                      </S.Horizontal>
                    )}
                  </div>
                  {autoType === 'SIMPLE' && !isWeapon(item) && (
                    <S.Horizontal style={{ gap: 4 }}>
                      {simpleStatusSetting.statType === 'ALL' ? (
                        <span style={{ width: 30 }}>
                          {getHighestStatLabel(item)}
                        </span>
                      ) : (
                        <span>{simpleStatusSetting.statType}</span>
                      )}
                      <S.FlameStatLabel
                        isMyStat={
                          simpleStatusSetting.expectStat !== undefined &&
                          simpleStatusSetting.expectStat <= getTotalStat()
                        }
                      >
                        {getTotalStat()}
                      </S.FlameStatLabel>
                      급
                    </S.Horizontal>
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
                  setIsEternalAuto(false)
                  setIsPowerfulAuto(false)
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
        </S.Container>
      </WindowContainer>
      {showSetting && (
        <StatusSetting
          item={item}
          loading={isPowerfulAuto || isEternalAuto}
          statusSetting={statusSetting}
          setStatusSetting={setStatusSetting}
          flameCostSetting={flameCostSetting}
          simpleStatusSetting={simpleStatusSetting}
          setSimpleStatusSetting={setSimpleStatusSetting}
          setFlameCostSetting={setFlameCostSetting}
          mesoKrwSetting={mesoKrwSetting}
          setMesoKrwSetting={setMesoKrwSetting}
          position={position}
          autoType={autoType}
          setAutoType={setAutoType}
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
    if (stat.bonus > 0) {
      return (
        <S.Horizontal
          style={{ justifyContent: 'space-between', width: '100%' }}
        >
          <S.FlameStatLabel
            isMyStat={
              autoType === 'DETAIL'
                ? isMyStatForDetail()
                : isMyStatForSimple(key)
            }
          >
            {stat.label} : {stat.bonus}
            {isPercent === true ? '%' : ''}
          </S.FlameStatLabel>
          {stat.bonusDetail && stat.bonusDetail.length > 0 && (
            <S.DetailWrapper>
              {stat.bonusDetail.map((detail, index) => (
                <S.FlameBonusDetailLabel key={index} grade={detail.grade}>
                  {detail.value}({detail.grade})
                </S.FlameBonusDetailLabel>
              ))}
            </S.DetailWrapper>
          )}
        </S.Horizontal>
      )
    }

    function isMyStatForDetail() {
      const definedKeys = getNotUndefined(statusSetting)
      const isExist = definedKeys.find((definedKey) => definedKey === key)
      const status = isExist ? statusSetting[isExist] : undefined
      return (
        isExist !== undefined && status !== undefined && stat.bonus >= status
      )
    }
    function isMyStatForSimple(key?: keyof EquipItemType) {
      if (!item) return false
      if (stat.bonusDetail === undefined || stat.bonusDetail.length === 0)
        return false

      if (isWeapon(item)) {
        if (
          !isMasicAttack(item) &&
          key === 'WEAPON_ATTACK' &&
          simpleStatusSetting.attackGrage &&
          stat.bonusDetail[0].grade <= simpleStatusSetting.attackGrage
        ) {
          return true
        }
        if (
          isMasicAttack(item) &&
          key === 'MAGIC_ATTACK' &&
          simpleStatusSetting.attackGrage &&
          stat.bonusDetail[0].grade <= simpleStatusSetting.attackGrage
        ) {
          return true
        }
        if (
          key === 'bossDemage' &&
          simpleStatusSetting.bossGrade &&
          stat.bonusDetail[0].grade <= simpleStatusSetting.bossGrade
        ) {
          return true
        }
        if (
          key === 'demage' &&
          simpleStatusSetting.demageGrade &&
          stat.bonusDetail[0].grade <= simpleStatusSetting.demageGrade
        ) {
          return true
        }
        if (
          key === 'AllStat' &&
          simpleStatusSetting.allStatGrade &&
          stat.bonusDetail[0].grade <= simpleStatusSetting.allStatGrade
        ) {
          return true
        }
      }
      // 방어구
      else {
        const highestStatLabel = getHighestStatLabel(item)
        if (
          simpleStatusSetting.expectStat &&
          simpleStatusSetting.expectStat <= getTotalStat() &&
          stat.bonus > 0
        ) {
          if (simpleStatusSetting.statType === key) {
            return true
          }
          if (
            (simpleStatusSetting.attackPerStat &&
              simpleStatusSetting.attackPerStat > 0 &&
              simpleStatusSetting.statType !== 'ALL' &&
              simpleStatusSetting.statType !== 'INT' &&
              key === 'WEAPON_ATTACK') ||
            (simpleStatusSetting.statType === 'INT' &&
              key === 'MAGIC_ATTACK') ||
            key === 'AllStat'
          ) {
            return true
          }
          if (
            simpleStatusSetting.statType === 'ALL' &&
            highestStatLabel === key
          ) {
            return true
          }
          if (
            simpleStatusSetting.statType === 'ALL' &&
            ((highestStatLabel !== 'INT' && key === 'WEAPON_ATTACK') ||
              (highestStatLabel === 'INT' && key === 'MAGIC_ATTACK'))
          ) {
            return true
          }
        }
        return false
      }
    }
  }
}

export default FlameOfResurrection
