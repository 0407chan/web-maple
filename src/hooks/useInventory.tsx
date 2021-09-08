import {
  addEquipment,
  increaseEquipMaxNum,
  openEquipInventory,
  setCurrentItem,
  setInventory,
  sortInventory,
  switchSlot,
  toggleInventory
} from '@/feature/inventory/inventorySlice'
import { RootState } from '@/store'
import { EquipType, SlotType } from '@/types/inventory'
import { useDispatch, useSelector } from 'react-redux'

const useInventory = () => {
  const currentInventory = useSelector(
    (state: RootState) => state.inventory.currentInventory
  )
  const currentItem = useSelector(
    (state: RootState) => state.inventory.currentItem
  )
  const equipMaxNum = useSelector(
    (state: RootState) => state.inventory.equipMaxNum
  )
  const inventory = useSelector((state: RootState) => state.inventory.inventory)
  const inventoryVisibility = useSelector(
    (state: RootState) => state.inventory.inventoryVisibility
  )

  const dispatch = useDispatch()

  const onSetInventoryEquip = () => dispatch(setInventory('Equip'))
  const onSetInventoryUse = () => dispatch(setInventory('Use'))
  const onSetInventoryEtc = () => dispatch(setInventory('Etc'))
  const onSwitchSlot = (startSlot: SlotType, nextSlot: SlotType) =>
    dispatch(switchSlot({ startSlot, nextSlot }))
  const onAddEquipment = (newSlot: SlotType) => dispatch(addEquipment(newSlot))
  const onSetCurrentItem = (item?: EquipType) => dispatch(setCurrentItem(item))
  const onSortInventory = () => dispatch(sortInventory())
  const onIncreaseEquipMaxNum = () => dispatch(increaseEquipMaxNum())
  const onOpenEquipInventory = () => dispatch(openEquipInventory())
  const onToggleInventory = () => dispatch(toggleInventory())
  // const onDeleteEquip = (itemId: number) => dispatch(deleteEquip(itemId))

  return {
    currentInventory,
    currentItem,
    equipMaxNum,
    inventory,
    inventoryVisibility,
    onSortInventory,
    onSwitchSlot,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventoryUse,
    onAddEquipment,
    onSetCurrentItem,
    onIncreaseEquipMaxNum,
    onOpenEquipInventory,
    onToggleInventory
    // onDeleteEquip,
  }
}

export default useInventory
