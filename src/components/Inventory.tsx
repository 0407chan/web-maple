import useInventory from "@/hooks/useInventory";
import images from "@/utils/images";
import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Inventory.scss";
import Item from "./Item";


function Inventory() {
  const {
    currInven,
    inventory,
    invenEquip,
    onSetInvenEquip,
    onSetInvenUse,
    onSetInvenEtc,
    onSetInvenSetup,
  } = useInventory();

  const [drag, setDrag] = useState(0);

  const onStart = () => {
    setDrag(1);
  };
  const onStop = () => {
    setDrag(0);
  };

  const renderEquipButton = () => {
    //활성화 됨
    if (currInven === 0) {
      return (
        <img
          src={images.images.invenEquipEnabled}
          className="item-tab-1"
          alt="inven"
        />
      );
    }

    return (
      <img
        src={images.images.invenEquipDisabled}
        className="item-tab-1"
        alt="inven"
        onClick={onSetInvenEquip}
      />
    );
  };

  const renderUseButton = () => {
    //활성화 됨
    if (currInven === 1) {
      return (
        <img
          src={images.images.invenUseEnabled}
          className="item-tab-2"
          alt="inven"
        />
      );
    }

    return (
      <img
        src={images.images.invenUseDisabled}
        className="item-tab-2"
        alt="inven"
        onClick={onSetInvenUse}
      />
    );
  };
  const renderEtcButton = () => {
    //활성화 됨
    if (currInven === 2) {
      return (
        <img
          src={images.images.invenEtcEnabled}
          className="item-tab-3"
          alt="inven"
        />
      );
    }

    return (
      <img
        src={images.images.invenEtcDisabled}
        className="item-tab-3"
        alt="inven"
        onClick={onSetInvenEtc}
      />
    );
  };
  const renderSetupButton = () => {
    //활성화 됨
    if (currInven === 3) {
      return (
        <img
          src={images.images.invenSetupEnabled}
          className="item-tab-4"
          alt="inven"
        />
      );
    }

    return (
      <img
        src={images.images.invenSetupDisabled}
        className="item-tab-4"
        alt="inven"
        onClick={onSetInvenSetup}
      />
    );
  };

  const renderItems = () => {
    if (invenEquip.length === 0) return;

    if (currInven === 0) {
      return (
        <>
          {invenEquip.map((inven, idx) => (
            <Item key={idx} {...inven} />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <Draggable bounds=".App" onStart={onStart} onStop={onStop}>
        <div className="inventory-wrapper">
          <div className="inventory-back-img"></div>
          <div className="inventory-item-slot-img"></div>

          <div className="inventory-item-wrapper">{renderItems()}</div>

          <div className="inventory-tap">
            {renderEquipButton()}
            {renderUseButton()}
            {renderEtcButton()}
            {renderSetupButton()}
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default Inventory;
