import { FlameType, StatusSettingType } from '@/types/flame'
import { BonusDetail, EquipItemType } from '@/types/inventory'
import {
  ARMER_OPTION_NAME,
  ETERNAL_FLAME_PERCENTAGE,
  POWERFUL_FLAME_PERCENTAGE,
  WAEPON_FLAME_OPTION,
  WEAPON_OPTION_NAME
} from './constants'

export const getRandomNum = (range: number): number => {
  return Math.floor(Math.random() * range + 1)
}

export const getGrade = (flameType: FlameType, item: EquipItemType): number => {
  const bossGrade = item.bossReward ? 2 : 0
  let result = bossGrade
  if (flameType === 'ETERNAL') {
    result += ETERNAL_FLAME_PERCENTAGE.get(getRandomNum(100)) ?? 4
  } else {
    result += POWERFUL_FLAME_PERCENTAGE.get(getRandomNum(100)) ?? 5
  }
  return result
}

export const calcSingleBonusStat = (
  flameType: FlameType,
  item: EquipItemType
): number => {
  const grade = getGrade(flameType, item)
  return (Math.floor(item.level / 20) + 1) * grade
}

export const getSingleStatDetail = (
  flameType: FlameType,
  item: EquipItemType
): BonusDetail => {
  const grade = getGrade(flameType, item)
  return {
    value: (Math.floor(item.level / 20) + 1) * grade,
    grade: (item.bossReward ? 8 : 6) - grade
  }
}

export const calcDoubleBonusStat = (
  flameType: FlameType,
  item: EquipItemType
): number => {
  const grade = getGrade(flameType, item)
  return (Math.floor(item.level / 40) + 1) * grade
}

export const getDoubleStatDetail = (
  flameType: FlameType,
  item: EquipItemType
): BonusDetail => {
  const grade = getGrade(flameType, item)
  return {
    value: (Math.floor(item.level / 40) + 1) * grade,
    grade: (item.bossReward ? 8 : 6) - grade
  }
}

export const getEmptyItem = (item: EquipItemType): EquipItemType => {
  const result: EquipItemType = {
    ...item,
    STR: { ...item.STR, bonus: 0, bonusDetail: undefined },
    DEX: { ...item.DEX, bonus: 0, bonusDetail: undefined },
    LUK: { ...item.LUK, bonus: 0, bonusDetail: undefined },
    INT: { ...item.INT, bonus: 0, bonusDetail: undefined },
    speed: { ...item.speed, bonus: 0, bonusDetail: undefined },
    bossDemage: { ...item.bossDemage, bonus: 0, bonusDetail: undefined },
    IgnoreDefence: { ...item.IgnoreDefence, bonus: 0, bonusDetail: undefined },
    HP: { ...item.HP, bonus: 0, bonusDetail: undefined },
    MP: { ...item.MP, bonus: 0, bonusDetail: undefined },
    MAGIC_ATTACK: { ...item.MAGIC_ATTACK, bonus: 0, bonusDetail: undefined },
    AVOIDABLILITY: { ...item.AVOIDABLILITY, bonus: 0, bonusDetail: undefined },
    AllStat: { ...item.AllStat, bonus: 0, bonusDetail: undefined },
    WEAPON_ATTACK: { ...item.WEAPON_ATTACK, bonus: 0, bonusDetail: undefined },
    demage: { ...item.demage, bonus: 0, bonusDetail: undefined },
    DEFENCE: { ...item.DEFENCE, bonus: 0, bonusDetail: undefined },
    RequierdLevel: { ...item.RequierdLevel, bonus: 0, bonusDetail: undefined },
    jump: { ...item.jump, bonus: 0, bonusDetail: undefined }
  }
  return result
}
export const getBossDetail = (
  flameType: FlameType,
  item: EquipItemType
): BonusDetail => {
  const grade = getGrade(flameType, item)
  return { value: grade * 2, grade: 8 - grade }
}

export const calcAttack = (
  item: EquipItemType,
  grade: 1 | 2 | 3 | 4 | 5
): number => {
  if (item.level < 150) {
    return WAEPON_FLAME_OPTION.rest[grade]
  } else {
    return WAEPON_FLAME_OPTION[item.level as 150 | 160 | 200][grade]
  }
}

export const getWeaponOption = (optionNumber = 4): string[] => {
  const options = [...WEAPON_OPTION_NAME]
  const result = []
  let count = 0
  while (count < optionNumber) {
    const index = Math.floor(Math.random() * options.length)
    result.push(options[index])
    options.splice(index, 1)
    count++
  }
  return result
}
export const getArmorOption = (optionNumber = 4): string[] => {
  const options = [...ARMER_OPTION_NAME]
  const result = []
  let count = 0
  while (count < optionNumber) {
    const index = Math.floor(Math.random() * options.length)
    result.push(options[index])
    options.splice(index, 1)
    count++
  }
  return result
}

export const getNotUndefined = (
  statusSetting: StatusSettingType
): (keyof StatusSettingType)[] => {
  const result: (keyof StatusSettingType)[] = []
  const {
    STR,
    DEX,
    INT,
    LUK,
    HP,
    WEAPON_ATTACK,
    MAGIC_ATTACK,
    AllStat,
    bossDemage,
    demage
  } = statusSetting
  if (STR) {
    result.push('STR')
  }
  if (DEX) {
    result.push('DEX')
  }
  if (INT) {
    result.push('INT')
  }
  if (LUK) {
    result.push('LUK')
  }
  if (HP) {
    result.push('HP')
  }
  if (MAGIC_ATTACK) {
    result.push('MAGIC_ATTACK')
  }
  if (WEAPON_ATTACK) {
    result.push('WEAPON_ATTACK')
  }
  if (bossDemage) {
    result.push('bossDemage')
  }
  if (demage) {
    result.push('demage')
  }
  if (AllStat) {
    result.push('AllStat')
  }
  return result
}

export const roundToOne = (num: string): number => {
  return +(Math.round(Number(num + 'e+1')) + 'e-1')
}
