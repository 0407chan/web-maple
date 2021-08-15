import {
  addEquipment,
  setCurrentItem,
  setInventory
} from '@/feature/inventory/inventorySlice'
import { RootState } from '@/store'
import { EquipType } from '@/types/inventory'
import { useDispatch, useSelector } from 'react-redux'

const useInventory = () => {
  const currentInventory = useSelector(
    (state: RootState) => state.inventory.currentInventory
  )
  const currentItem = useSelector(
    (state: RootState) => state.inventory.currentItem
  )
  const invenEquip = useSelector(
    (state: RootState) => state.inventory.invenEquip
  )

  const dispatch = useDispatch()

  const onSetInventoryEquip = () => dispatch(setInventory('Equip'))
  const onSetInventoryUse = () => dispatch(setInventory('Use'))
  const onSetInventoryEtc = () => dispatch(setInventory('Etc'))
  const onSetInventorySetup = () => dispatch(setInventory('Setup'))

  const onAddEquipment = (newItem: EquipType) => dispatch(addEquipment(newItem))
  const onSetCurrentItem = (item?: EquipType) => dispatch(setCurrentItem(item))
  // const onDeleteEquip = (itemId: number) => dispatch(deleteEquip(itemId))

  return {
    currentInventory,
    currentItem,
    invenEquip,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventorySetup,
    onSetInventoryUse,
    onAddEquipment,
    onSetCurrentItem
    // onDeleteEquip,
  }
}

export default useInventory
