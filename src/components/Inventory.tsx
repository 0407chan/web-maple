import React from "react";
import "./Inventory.scss";
import { images } from "../utils/images";
import useInventory from "../hooks/useInventory";
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

  const renderEquipButton = () => {
    //활성화 됨
    if (currInven === 0) {
      return (
        <img
          src={images.invenEquipEnabled}
          className="item-tab-1"
          alt="inven"
        />
      );
    }

    return (
      <img
        src={images.invenEquipDisabled}
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
        <img src={images.invenUseEnabled} className="item-tab-2" alt="inven" />
      );
    }

    return (
      <img
        src={images.invenUseDisabled}
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
        <img src={images.invenEtcEnabled} className="item-tab-3" alt="inven" />
      );
    }

    return (
      <img
        src={images.invenEtcDisabled}
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
          src={images.invenSetupEnabled}
          className="item-tab-4"
          alt="inven"
        />
      );
    }

    return (
      <img
        src={images.invenSetupDisabled}
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
          {invenEquip.map((inven) => (
            <Item key={inven.id} {...inven} />
          ))}
        </>
      );
    }
  };

  return (
    <>
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
    </>
  );
}

export default Inventory;
