import React from "react";
import "./Inventory.scss";
import { images } from "../utils/images";

function Inventory() {
  return (
    <>
      <div className="inventory-wrapper">
        <img src={images.inventory} className="inven-1" alt="inven" />
        <img src={images.inventory2} className="inven-2" alt="inven" />
        <img src={images.inventory3} className="inven-3" alt="inven" />
        <img src={images.itemTab1} className="item-tab-1" alt="inven" />
        <img src={images.itemTab2} className="item-tab-2" alt="inven" />
        <img src={images.itemTab3} className="item-tab-3" alt="inven" />
        <img src={images.itemTab4} className="item-tab-4" alt="inven" />
      </div>
    </>
  );
}

export default Inventory;
