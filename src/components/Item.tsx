import React from "react";
import "./Item.scss";
import { EquipType } from "../modules/inventory/types";

function Item(props: EquipType) {
  const { id, image, name } = props;

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="item-wrapper">
        <img
          src={image}
          className="item-img"
          onDragStart={preventDragHandler}
          alt="itemImage"
        />
      </div>
    </>
  );
}

export default Item;
