import { EquipItemType } from '@/types/inventory'
import { StarForceSetting } from '@/types/star-force'

export const isOnePlusOne = (
  item: EquipItemType,
  starForceSetting: StarForceSetting
): boolean => {
  if (
    starForceSetting.eventOnePlusOne === true &&
    item.isSuperior !== true &&
    item.star <= 10
  ) {
    return true
  }

  return false
}

export const is1516 = (
  item: EquipItemType,
  starForceSetting: StarForceSetting
): boolean => {
  if (
    starForceSetting.event1516 === true &&
    item.isSuperior !== true &&
    (item.star === 5 || item.star === 10 || item.star === 15)
  ) {
    return true
  }

  return false
}
