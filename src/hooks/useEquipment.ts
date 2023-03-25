import {
  removeEquip,
  setEquip,
  updateEquipSlot
} from 'feature/equipment/equipmentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { EquipSlotType, ISlotsType } from 'types/equipment'
import { EquipItemType } from 'types/inventory'

const useEquipment = () => {
  const dispatch = useDispatch()
  const equipment = useSelector((state: RootState) => state.equipment.equipment)

  const onSetEquip = (iSlotType: ISlotsType, item: EquipItemType) =>
    dispatch(setEquip({ iSlotType, item }))

  const onRemoveEquip = (iSlotType: ISlotsType) =>
    dispatch(removeEquip({ iSlotType }))

  const onUpdateEquipSlot = (slot: EquipSlotType) =>
    dispatch(updateEquipSlot({ slot }))

  return {
    equipment,
    onSetEquip,
    onRemoveEquip,
    onUpdateEquipSlot
  }
}

export default useEquipment
