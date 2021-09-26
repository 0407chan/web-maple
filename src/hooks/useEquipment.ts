import { removeEquip, setEquip } from '@/feature/equipment/equipmentSlice'
import { RootState } from '@/store'
import { ISlotsType } from '@/types/equipment'
import { EquipItemType } from '@/types/inventory'
import { useDispatch, useSelector } from 'react-redux'

const useEquipment = () => {
  const dispatch = useDispatch()
  const equipment = useSelector((state: RootState) => state.equipment.equipment)

  const onSetEquip = (iSlotType: ISlotsType, item: EquipItemType) =>
    dispatch(setEquip({ iSlotType, item }))

  const onRemoveEquip = (iSlotType: ISlotsType) =>
    dispatch(removeEquip({ iSlotType }))

  return {
    equipment,
    onSetEquip,
    onRemoveEquip
  }
}

export default useEquipment