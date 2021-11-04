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

export type BonusDetail = {
  grade: number
  value: number
}
export type StatusBase = {
  // 값
  base: number // 기본
  bonus: number // 추가옵션
  bonusDetail?: BonusDetail[]
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
  itemId: number
  job: string
  bossReward: boolean
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
  DEFENCE: StatusBase
  WEAPON_ATTACK: StatusBase
  MAGIC_ATTACK: StatusBase
  AVOIDABLILITY: StatusBase
  AllStat: StatusBase
  IgnoreDefence: StatusBase
  bossDemage: StatusBase
  demage: StatusBase
  jump: StatusBase
  speed: StatusBase
  isSuperior: boolean
  isDestroyed: boolean
  RequierdLevel: StatusBase
  upgrade_avalable: number
  max_upgrade: number
  upgrade: number
  maxStar: number
  star: number
}
