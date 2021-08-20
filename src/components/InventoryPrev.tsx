import useInventory from '@/hooks/useInventory'
import images from '@/utils/images'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import './Inventory.scss'
import Item from './Item'

const InventoryPrev: React.FC = () => {
  const {
    currentInventory,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventorySetup,
    onSetInventoryUse,
    invenEquip
  } = useInventory()

  const ref = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState(0)
  const [positionX, setPositionX] = useState<number>(0)

  useEffect(() => {
    if (ref.current?.parentElement?.clientWidth !== undefined) {
      setPositionX(ref.current.parentElement.clientWidth)
    }
  }, [ref.current?.parentElement?.clientWidth])

  const onStart = () => {
    setDrag(1)
  }
  const onStop = () => {
    setDrag(0)
  }

  const renderEquipButton = () => {
    //활성화 됨
    if (currentInventory === 0) {
      return (
        <img
          src={images.images.invenEquipEnabled}
          className="item-tab-1"
          alt="inven"
        />
      )
    }

    return (
      <img
        src={images.images.invenEquipDisabled}
        className="item-tab-1"
        alt="inven"
        onClick={onSetInventoryEquip}
      />
    )
  }

  const renderUseButton = () => {
    //활성화 됨
    if (currentInventory === 1) {
      return (
        <img
          src={images.images.invenUseEnabled}
          className="item-tab-2"
          alt="inven"
        />
      )
    }

    return (
      <img
        src={images.images.invenUseDisabled}
        className="item-tab-2"
        alt="inven"
        onClick={onSetInventoryUse}
      />
    )
  }
  const renderEtcButton = () => {
    //활성화 됨
    if (currentInventory === 2) {
      return (
        <img
          src={images.images.invenEtcEnabled}
          className="item-tab-3"
          alt="inven"
        />
      )
    }

    return (
      <img
        src={images.images.invenEtcDisabled}
        className="item-tab-3"
        alt="inven"
        onClick={onSetInventoryEtc}
      />
    )
  }
  const renderSetupButton = () => {
    //활성화 됨
    if (currentInventory === 3) {
      return (
        <img
          src={images.images.invenSetupEnabled}
          className="item-tab-4"
          alt="inven"
        />
      )
    }

    return (
      <img
        src={images.images.invenSetupDisabled}
        className="item-tab-4"
        alt="inven"
        onClick={onSetInventorySetup}
      />
    )
  }

  const renderItems = () => {
    if (invenEquip.length === 0) return

    if (currentInventory === 0) {
      return (
        <>
          {invenEquip.map((inven, idx) => (
            <Item key={idx} item={inven.item} />
          ))}
        </>
      )
    }
  }

  return (
    <Draggable
      onStart={onStart}
      onStop={onStop}
      bounds="body"
      defaultPosition={{
        x: positionX,
        y: 100
      }}
    >
      <div
        ref={ref}
        className="inventory-wrapper"
        style={{ left: positionX / 2 - 86 }}
      >
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
  )
}

export default InventoryPrev
