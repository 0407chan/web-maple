import { getAllEquip } from '@/api/equipItem'
import Inventory from '@/components/Inventory'
import ToolTip from '@/components/ToolTip/ToolTip'
import { EQUIP_LIST } from '@/dummy/equip'
import useInventory from '@/hooks/useInventory'
import React from 'react'
import './App.css'
import ToolTipPrev from './components/ToolTipPrev'
import { SlotType } from './types/inventory'

export const ItemTypes = {
  FOOD: 'food',
  GLASS: 'glass',
  PAPER: 'paper'
}

const App: React.FC = () => {
  const { onAddEquipment, invenEquip, onSwitchSlot } = useInventory()

  const addRandomEquip = () => {
    const newInven = invenEquip.filter((slot) => slot.item === undefined)
    if (newInven.length === 0) {
      console.log('장비창 꽉찼다!')
      return
    }
    const randomNum = Math.floor(Math.random() * EQUIP_LIST.length)
    const newSlot: SlotType = { ...newInven[0], item: EQUIP_LIST[randomNum] }

    // const newEquip = { ...EQUIP_LIST[Math.floor(Math.random() * 5)] }
    // API.EquipItem.addEquip(newEquip);
    onAddEquipment(newSlot)
  }

  const onGetAllEquipment = async () => {
    try {
      const payload = await getAllEquip()
      console.log(payload)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDrop = (startSlot: SlotType, endSlot: SlotType) => {
    onSwitchSlot(startSlot, endSlot)
  }

  return (
    <div className="App">
      <ToolTip />
      <ToolTipPrev />
      <Inventory handleDrop={handleDrop} />
      <button onClick={() => addRandomEquip()}>장비 추가</button>
      <button onClick={onGetAllEquipment}>장비 불러오기</button>
    </div>
  )
}

export default App
