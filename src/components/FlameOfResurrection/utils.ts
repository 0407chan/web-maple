import { EquipItemType } from '@/types/inventory'
import {
  ETERNAL_FLAME_PERCENTAGE,
  POWERFUL_FLAME_PERCENTAGE
} from './constants'

export const getRandomNum = (range: number): number => {
  return Math.floor(Math.random() * range + 1)
}

export const calcSingleBonusStatEternal = (item: EquipItemType): number => {
  const grade = ETERNAL_FLAME_PERCENTAGE.get(getRandomNum(100))
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 20) + 1) * (bossGrade + grade)
}
export const calcDoubleBonusStatEternal = (item: EquipItemType): number => {
  const grade = ETERNAL_FLAME_PERCENTAGE.get(getRandomNum(100))
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 40) + 1) * (bossGrade + grade)
}

// 단일 스텟
export const calcSingleBonusStatPowerful = (item: EquipItemType): number => {
  const grade = POWERFUL_FLAME_PERCENTAGE.get(getRandomNum(100))
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 20) + 1) * (bossGrade + grade)
}
// 이중 스텟
export const calcDoubleBonusStatPowerful = (item: EquipItemType): number => {
  const grade = ETERNAL_FLAME_PERCENTAGE.get(getRandomNum(100))
  const bossGrade = item.bossReward ? 2 : 0
  if (grade === undefined) return 0
  return (Math.floor(item.level / 40) + 1) * (bossGrade + grade)
}
