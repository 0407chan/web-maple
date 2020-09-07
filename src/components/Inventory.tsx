import React from "react";
import "./Inventory.css";
import inventory from "../image/Item.backgrnd.png";
import inventory2 from "../image/Item.backgrnd2.png";
import inventory3 from "../image/Item.backgrnd3.png";
import itemTab1 from "../image/Item.Tab.disabled.0.png";
import itemTab2 from "../image/Item.Tab.disabled.1.png";
import itemTab3 from "../image/Item.Tab.disabled.2.png";
import itemTab4 from "../image/Item.Tab.disabled.3.png";

function Inventory() {
  return (
    <>
      <div className="inventory-wrapper">
        <img src={inventory} className="inven-1" alt="inven" />
        <img src={inventory2} className="inven-2" alt="inven" />
        <img src={inventory3} className="inven-3" alt="inven" />
        <img src={itemTab1} className="item-tab-1" alt="inven" />
        <img src={itemTab2} className="item-tab-2" alt="inven" />
        <img src={itemTab3} className="item-tab-3" alt="inven" />
        <img src={itemTab4} className="item-tab-4" alt="inven" />
      </div>
    </>
  );
}

export default Inventory;
