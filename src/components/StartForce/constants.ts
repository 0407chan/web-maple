import { EquipItemType } from '@/types/inventory'

export const getMaxStar = (item: EquipItemType): number => {
  if (item.level <= 94) {
    return 5
  } else if (item.level >= 95 && item.level <= 107) {
    return 8
  } else if (item.level >= 108 && item.level <= 117) {
    return 15
  } else if (item.level >= 118 && item.level <= 127) {
    return 15
  } else if (item.level >= 128 && item.level <= 137) {
    return 20
  } else return 25
}
