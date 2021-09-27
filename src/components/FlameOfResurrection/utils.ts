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

type FlameType = 'ETERNAL' | 'POWERFUL'
export const getGrade = (flameType: FlameType, item: EquipItemType): number => {
  const bossGrade = item.bossReward ? 2 : 0
  let result = bossGrade
  if (flameType === 'ETERNAL') {
    result += ETERNAL_FLAME_PERCENTAGE.get(getRandomNum(100)) ?? 4
  } else {
    result += POWERFUL_FLAME_PERCENTAGE.get(getRandomNum(100)) ?? 4
  }
  return result
}

export const getEternalGrade = (): number => {
  return ETERNAL_FLAME_PERCENTAGE.get(getRandomNum(100)) ?? 4
}
export const getPowerfulGrade = (): number => {
  return POWERFUL_FLAME_PERCENTAGE.get(getRandomNum(100)) ?? 5
}
export const calcSingleBonusStatEternal = (item: EquipItemType): number => {
  const grade = getEternalGrade()
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 20) + 1) * (bossGrade + grade)
}
export const calcDoubleBonusStatEternal = (item: EquipItemType): number => {
  const grade = getEternalGrade()
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 40) + 1) * (bossGrade + grade)
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

// 단일 스텟
export const calcSingleBonusStatPowerful = (item: EquipItemType): number => {
  const grade = getPowerfulGrade()
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 20) + 1) * (bossGrade + grade)
}
// 이중 스텟
export const calcDoubleBonusStatPowerful = (item: EquipItemType): number => {
  const grade = getPowerfulGrade()
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 40) + 1) * (bossGrade + grade)
}

export const getFourWeaponOption = () => {
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
export const getFourArmorOption = () => {
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
