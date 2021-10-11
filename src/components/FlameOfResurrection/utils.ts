import { FlameType, StatusSettingType } from '@/types/flame'
import { EquipItemType } from '@/types/inventory'
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
export const calcDoubleBonusStat = (
  flameType: FlameType,
  item: EquipItemType
): number => {
  const grade = getGrade(flameType, item)
  return (Math.floor(item.level / 40) + 1) * grade
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

export const getFourWeaponOption = (): string[] => {
  const options = [...WEAPON_OPTION_NAME]
  const result = []
  let count = 0
  while (count < 4) {
    const index = Math.floor(Math.random() * options.length)
    result.push(options[index])
    options.splice(index, 1) // Remove the item from the array
    count++
  }
  return result
}
export const getFourArmorOption = (): string[] => {
  const options = [...ARMER_OPTION_NAME]
  const result = []
  let count = 0
  while (count < 4) {
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
    AllStat,
    DEX,
    INT,
    LUK,
    MAGIC_ATTACK,
    STR,
    WEAPON_ATTACK,
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
