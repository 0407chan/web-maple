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
