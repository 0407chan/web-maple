import React from "react";
import "./Item.scss";
// import { EquipType } from "../modules/item/types";
import { EquipType } from "../modules/inventory";
import useToolTip from "../hooks/useToolTip";
import useInventory from "../hooks/useInventory";
import { emptyEquip } from "../dummy/equip";
function Item(props: EquipType) {
  const {
    visible,
    setDisplayNone,
    setDisplayVisible,
    onSetMousePosition,
  } = useToolTip();
  const { onSetCurrItem } = useInventory();
  const { id, image, name } = props;

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const setDispalyVisibleAction = () => {
    onSetCurrItem(props);
    setDisplayVisible();
  };

  const setDispalyNoneAction = () => {
    // setDisplayNone();
    // onSetCurrItem(emptyEquip);
  };

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onSetMousePosition(event.clientX, event.clientY);
  };

  return (
    <>
      <div
        className="item-wrapper"
        onMouseOver={setDispalyVisibleAction}
        onMouseOut={setDispalyNoneAction}
        onMouseMove={setMousePosition}
      >
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
