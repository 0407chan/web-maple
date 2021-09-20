import { SlotType } from '../inventory'

export type EquipSlotType = SlotType & {
  slotType: ISlotsType
  slotTypeName: ISlotsTypeName
}

export type ISlotsType =
  | 'Wp' // 무기
  | 'Si' // 보조
  | 'Ma' // 상의
  | 'Pn' // 하의
  | 'Sr' // 망토
  | 'Gv' // 장갑 clove
  | 'Cp' // 모자 cap
  | 'So' // 신발
  | 'Be' // 벨트
  | 'Ae' // 귀고리
  | 'Ay' // 눈장식
  | 'Af' // 얼굴장식
  | 'Pe' // 펜던트
  | 'Ri' // 반지
  | 'Sh' // 견장

export const SlotName: Record<ISlotsType, ISlotsTypeName> = {
  Wp: 'Weapon',
  Si: 'Sub Weapon',
  Ma: 'Clothes',
  Pn: 'Pants',
  Sr: 'Cape',
  Gv: 'Glove',
  Cp: 'Cap',
  So: 'Shoes',
  Be: 'Belt',
  Ae: 'Earring',
  Ay: 'Eye Acc',
  Af: 'Face Acc',
  Pe: 'Pendant',
  Ri: 'Ring',
  Sh: 'Shoulder'
}

export type ISlotsTypeName =
  | 'Weapon'
  | 'Sub Weapon'
  | 'Clothes'
  | 'Pants'
  | 'Cape'
  | 'Glove'
  | 'Cap'
  | 'Shoes'
  | 'Belt'
  | 'Earring'
  | 'Eye Acc'
  | 'Face Acc'
  | 'Pendant'
  | 'Ring'
  | 'Shoulder'

export type EquipmentSlotType =
  | 'Weapon'
  | 'Side Weapon'
  | 'Coat'
  | 'Pants'
  | 'Cape'
  | 'Glove'
  | 'Cap'
  | 'Shoes'
  | 'Belt'
  | 'Earrings'
  | 'Eye Decoration'
  | 'Face Accessory'
  | 'Pendant'
  | 'Ring'
  | 'Shoulder Accessory'

export type EquipGroup =
  | 'Weapon'
  | 'Coat'
  | 'Pants'
  | 'Cape'
  | 'Glove'
  | 'Cap'
  | 'Longcoat'
  | 'Shield'
  | 'Shoes'
  | 'Accessory'
  | 'Ring'

export type SubCategory =
  | 'Two-Handed Sword'
  | 'Two-Handed Axe'
  | 'Spear'
  | 'Top'
  | 'Bottom'
  | 'Cape'
  | 'Glove'
  | 'Hat'
  | 'Overall'
  | 'Shield'
  | 'Shoes'
  | 'Belt'
  | 'Earrings'
  | 'Emblem'
  | 'Eye Decoration'
  | 'Face Accessory'
  | 'Pendant'
  | 'Ring'
  | 'Shoulder Accessory'

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
  islots: ISlotsType[]
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
