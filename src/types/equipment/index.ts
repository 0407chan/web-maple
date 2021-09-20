import { SlotType } from '../inventory'

export type EquipSlotType = SlotType & {
  slotType: EquipSlotCategory
}

export type EquipSlotCategory =
  | 'CAP'
  | 'WEAPON'
  | 'GLOVES'
  | 'SHOES'
  | 'CAPE'
  | 'CLOTHES'
  | 'PANTS'
  | 'EYE'
  | 'RING'
  | 'PENDANT'

export type GetEquipmentQuery = {
  itemId: number
}
export type GetEquipmentResponse = EquipmentItemType

export type GetEquipmentListQuery = {
  startPosition?: number
  count?: number
  overallCategoryFilter?: string
  categoryFilter?: string
  subCategoryFilter?: string
  jobFilter?: number
  cashFilter?: boolean
  minLevelFilter?: number
  maxLevelFilter?: number
  genderFilter?: number
  searchFor?: string
}
export type GetEquipmentListResponse = EquipmentItemListType[]

export type EquipmentItemListType = {
  desc: string
  id: number
  isCash: boolean
  name: string
  requiredGender: number
  requiredJobs: string[]
  requiredLevel: number
  typeInfo: TypeInfo
}

export type Origin = {
  hasValue: boolean
  value: Position
}

export type Description = {
  id: number
  name: string
  description: string
}

export type IconOrigin = {
  hasValue: boolean
  value: Position
}

export type IconRawOrigin = {
  hasValue: boolean
  value: Position
}

export type MetaInfo = {
  only: boolean
  cash: boolean
  reqLevel: number
  mob: number
  iconRaw: string
  icon: string
  iconOrigin: IconOrigin
  iconRawOrigin: IconRawOrigin
  slotMax: number
  price: number
  reqSTR: number
  reqDEX: number
  reqINT: number
  reqLUK: number
  reqJob: number
  reqLevelEquip: number
  tuc: number
  incPAD: number
  attack: number
  attackSpeed: number
  vslots: string[]
  islots: string[]
  setCompleteCount: number
}

export type TypeInfo = {
  category: string
  highItemId: number
  lowItemId: number
  overallCategory: string
  subCategory: string
}

export type EquipmentItemType = {
  frameBooks: FrameBooks
  equipGroup: string
  id: number
  description: Description
  metaInfo: MetaInfo
  typeInfo: TypeInfo
}

export type FrameBooks = {
  alert: Frame[]
  fly: Frame[]
  heal: Frame[]
  jump: Frame[]
  prone: Frame[]
  proneStab: Frame[]
  stabO1: Frame[]
  stabO2: Frame[]
  stabOF: Frame[]
  stand1: Frame[]
  swingO1: Frame[]
  swingO2: Frame[]
  swingO3: Frame[]
  swingOF: Frame[]
  walk1: Frame[]
}

export type Weapon = {
  image: string
  origin: {
    hasValue: boolean
    value: Position
  }
  originOrZero: Position
  mapOffset: {
    hand: Position
  }
  position: string
}

export type Effects = {
  weapon: Weapon
}

export type Frame = {
  effects: Effects
}

type Position = {
  x: number
  y: number
  isEmpty: boolean
}
