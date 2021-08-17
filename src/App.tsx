import { getAllEquip } from '@/api/equipItem'
import Inventory from '@/components/Inventory'
import ToolTip from '@/components/ToolTip'
import { EQUIP_LIST } from '@/dummy/equip'
import useInventory from '@/hooks/useInventory'
import update from 'immutability-helper'
import React, { useCallback, useState } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import './App.css'
import { Box } from './components/Example/Box'
import { Dustbin } from './components/Example/Dustbin'

export const ItemTypes = {
  FOOD: 'food',
  GLASS: 'glass',
  PAPER: 'paper'
}
interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
}
interface BoxState {
  name: string
  type: string
}

const App: React.FC = () => {
  const { onAddEquipment } = useInventory()

  const [boxes] = useState<BoxState[]>([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER }
  ])

  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null }
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

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

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      )
    },
    [droppedBoxNames, dustbins]
  )

  return (
    <div className="App">
      <ToolTip />
      <Inventory />
      {dustbins.map(({ accepts, lastDroppedItem }, index) => (
        <Dustbin
          accept={accepts}
          lastDroppedItem={lastDroppedItem}
          onDrop={(item) => handleDrop(index, item)}
          key={index}
        />
      ))}
      {boxes.map(({ name, type }, index) => (
        <Box name={name} type={type} isDropped={isDropped(name)} key={index} />
      ))}
      <button onClick={() => addRandomEquip()}>장비 추가</button>
      <button onClick={onGetAllEquipment}>장비 불러오기</button>
    </div>
  )
}

export default App
