import { EquipSlotType, ISlotsType, SlotName } from '@/types/equipment'
import { EquipItemType } from '@/types/inventory'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

export type InventoryState = {
  equipment: EquipSlotType[]
  currentItem?: EquipItemType
}

const emptyInven: EquipSlotType[] = []
emptyInven.push({
  id: uuid(),
  slotType: 'Cp',
  slotTypeName: SlotName['Cp'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Sr',
  slotTypeName: SlotName['Sr'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Ay',
  slotTypeName: SlotName['Ay'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Af',
  slotTypeName: SlotName['Af'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Ma',
  slotTypeName: SlotName['Ma'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Pe',
  slotTypeName: SlotName['Pe'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Gv',
  slotTypeName: SlotName['Gv'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Pn',
  slotTypeName: SlotName['Pn'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Ae',
  slotTypeName: SlotName['Ae'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Ri',
  slotTypeName: SlotName['Ri'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Sh',
  slotTypeName: SlotName['Sh'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Wp',
  slotTypeName: SlotName['Wp'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'So',
  slotTypeName: SlotName['So'],
  isOpen: true
})
emptyInven.push({
  id: uuid(),
  slotType: 'Be',
  slotTypeName: SlotName['Be'],
  isOpen: true
})

const initialState: InventoryState = {
  equipment: emptyInven,
  currentItem: undefined
}

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquip: (
      state,
      action: PayloadAction<{
        iSlotType: ISlotsType
        item: EquipItemType
      }>
    ) => {
      state.equipment = state.equipment.map((equip) => {
        if (equip.slotType === action.payload.iSlotType) {
          return { ...equip, item: action.payload.item }
        }
        return equip
      })
    },
    removeEquip: (
      state,
      action: PayloadAction<{
        iSlotType: ISlotsType
      }>
    ) => {
      state.equipment = state.equipment.map((equip) => {
        if (equip.slotType === action.payload.iSlotType) {
          return { ...equip, item: undefined }
        }
        return equip
      })
    },
    updateEquipSlot: (
      state,
      action: PayloadAction<{
        slot: EquipSlotType
      }>
    ) => {
      state.equipment = state.equipment.map((slot) => {
        if (slot.id === action.payload.slot.id) {
          return action.payload.slot
        } else {
          return slot
        }
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const { setEquip, removeEquip, updateEquipSlot } = equipmentSlice.actions

export default equipmentSlice.reducer
