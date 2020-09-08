import React from "react";
import "./App.css";
import Inventory from "./components/Inventory";
import Counter from "./components/Counter";
import useInventory from "./hooks/useInventory";
import { EquipImages } from "./utils/images";
import { emptyEquip } from "./dummy/equip";
function App() {
  const { onAddEquip, invenEquip } = useInventory();

  const addRandomEquip = () => {
    let newEquip = { ...emptyEquip };
    newEquip.id = invenEquip.length;
    newEquip.image = EquipImages[Math.floor(Math.random() * 8)];
    onAddEquip(newEquip);
  };

  return (
    <div className="App">
      <Inventory />
      <Counter />
      <button onClick={() => addRandomEquip()}>장비 추가</button>
    </div>
  );
}

export default App;
