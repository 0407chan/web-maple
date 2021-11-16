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
