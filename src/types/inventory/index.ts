import {
  EquipGroup,
  ISlotsType,
  SubCategory,
  SubCategoryName
} from '../equipment'

export type InventoryType = 'Equip' | 'Use' | 'Etc'

export enum InventoryTypeValue {
  Equip,
  Use,
  Etc
}

export type StatusBase = {
  // 값
  base: number // 기본
  bonus: number // 추가옵션
  reinforce: number // 강화옵션

  // 라벨
  label: string
}

export type SlotType = {
  id: string
  isOpen: boolean
  item?: EquipItemType
}

export type EquipItemType = {
  id: string
  job: string
  level: number
  islots: ISlotsType
  equipGroup: EquipGroup
  category: SubCategory
  categoryName: SubCategoryName
  name: string
  image: string
  STR: StatusBase
  DEX: StatusBase
  INT: StatusBase
  LUK: StatusBase
  HP: StatusBase
  MP: StatusBase
  PHYSICAL_DEFENCE: StatusBase
  MAGICAL_DEFENCE: StatusBase
  WEAPON_ATTACK: StatusBase
  MAGIC_ATTACK: StatusBase
  AVOIDABLILITY: StatusBase
  AllStat: StatusBase
  upgrade_avalable: number
  max_upgrade: number
  upgrade: number
  max_star: number
  star: number
}
