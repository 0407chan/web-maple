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
  id: number
  isOpen: boolean
  item?: EquipType
}

export type EquipType = {
  id: number
  job: string
  category: string
  name: string
  image: string
  STR: StatusBase
  DEX: StatusBase
  INT: StatusBase
  LUK: StatusBase
  HP: StatusBase
  MP: StatusBase
  WEAPON_ATTACK: StatusBase
  MAGIC_ATTACK: StatusBase
  AllStat: StatusBase
  upgrade_avalable: number
  max_upgrade: number
  upgrade: number
  max_star: number
  star: number
}
