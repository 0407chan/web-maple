import { getAllEquip } from '@/api/equipItem'
import Inventory from '@/components/Inventory'
import ToolTip from '@/components/ToolTip'
import { EQUIP_LIST } from '@/dummy/equip'
import useInventory from '@/hooks/useInventory'
import React from 'react'
import './App.css'
const App: React.FC = () => {
  const { onAddEquipment } = useInventory()

  const addRandomEquip = () => {
    const newEquip = { ...EQUIP_LIST[0] }
    // const newEquip = { ...EQUIP_LIST[Math.floor(Math.random() * 5)] }
    // API.EquipItem.addEquip(newEquip);
    onAddEquipment(newEquip)
  }

  const onGetAllEquipment = async () => {
    try {
      const payload = await getAllEquip()
      console.log(payload)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <ToolTip />
      <Inventory />
      <button onClick={() => addRandomEquip()}>장비 추가</button>
      <button onClick={onGetAllEquipment}>장비 불러오기</button>
    </div>
  )
}

export default App
