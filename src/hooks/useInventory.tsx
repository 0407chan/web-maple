import {
  addEquipment,
  increaseEquipMaxNum,
  openEquipInventory,
  removeEquipItem,
  setCurrentItem,
  setInventory,
  sortInventory,
  switchSlot,
  updateInventorySlot
} from 'feature/inventory/inventorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { EquipItemType, SlotType } from 'types/inventory'

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

  const dispatch = useDispatch()

  const getEmptySlot = () => {
    return inventory[currentInventory].find((slot) => slot.isOpen && !slot.item)
  }

  const onSetInventoryEquip = () => dispatch(setInventory('Equip'))
  const onSetInventoryUse = () => dispatch(setInventory('Use'))
  const onSetInventoryEtc = () => dispatch(setInventory('Etc'))
  const onSwitchSlot = (startSlot: SlotType, nextSlot: SlotType) =>
    dispatch(switchSlot({ startSlot, nextSlot }))
  const onAddEquipment = (newSlot: SlotType) => dispatch(addEquipment(newSlot))
  const onSetCurrentItem = (item?: EquipItemType) =>
    dispatch(setCurrentItem(item))
  const onSortInventory = () => dispatch(sortInventory())
  const onIncreaseEquipMaxNum = () => dispatch(increaseEquipMaxNum())
  const onOpenEquipInventory = () => dispatch(openEquipInventory())
  const onRemoveEquipItem = (slotId: string) =>
    dispatch(removeEquipItem(slotId))

  const onUpdateInventorySlot = (slot: SlotType) =>
    dispatch(updateInventorySlot({ slot }))

  return {
    currentInventory,
    currentItem,
    equipMaxNum,
    inventory,
    onSortInventory,
    onSwitchSlot,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventoryUse,
    onAddEquipment,
    onSetCurrentItem,
    onIncreaseEquipMaxNum,
    onOpenEquipInventory,
    onRemoveEquipItem,
    onUpdateInventorySlot,
    getEmptySlot
  }
}

export default useInventory
