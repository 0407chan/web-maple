import React from "react";
import "./Item.scss";
import { EquipType } from "../modules/inventory/types";

function Item(props: EquipType) {
  const { id } = props;

  return (
    <>
      <div className="item-wrapper">{id}</div>
    </>
  );
}

export default Item;
