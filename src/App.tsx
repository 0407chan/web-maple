import React from "react";
import "./App.css";
import Inventory from "./components/Inventory";
import Counter from "./components/Counter";
import ToolTip from "./components/ToolTip";
import useInventory from "./hooks/useInventory";
import { equips } from "./dummy/equip";
import API from "./api";
function App() {
  const { onAddEquip } = useInventory();

  const addRandomEquip = () => {
    let newEquip = { ...equips[Math.floor(Math.random() * 5)] };
    API.EquipItem.addEquip(newEquip);
    onAddEquip(newEquip);
  };

  const getAllEquip = () => {
    API.EquipItem.getAllEquip();
  };

  return (
    <div className="App">
      <ToolTip />
      <Inventory />
      <Counter />
      <button onClick={() => addRandomEquip()}>장비 추가</button>
      <button onClick={() => getAllEquip()}>장비 보기</button>
    </div>
  );
}

export default App;
