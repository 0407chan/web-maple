import useInventory from '@/hooks/useInventory'
import images from '@/utils/images'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import Item from '../Item'
import Item2 from '../Item/Item2'
import './Inventory.scss'
import * as S from './style'

const Inventory: React.FC = () => {
  const {
    currentInventory,
    equipMaxNum,
    currentItem,
    onSetInventoryEquip,
    onSetInventoryEtc,
    onSetInventorySetup,
    onSetInventoryUse,
    invenEquip
  } = useInventory()

  const [drag, setDrag] = useState(0)

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
            <Item key={idx} item={inven} />
          ))}
        </>
      )
    }
  }

  return (
    <div>
      <Draggable
        bounds=".App"
        onStart={onStart}
        onStop={onStop}
        defaultPosition={{
          x: document.body.clientWidth / 2 - 86,
          y: 100
        }}
      >
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
      <Draggable bounds=".App" onStart={onStart} onStop={onStop}>
        <S.Contianer>
          <S.InventoryHeader>ITEM INVENTORY</S.InventoryHeader>
          <S.InventoryBody>
            <S.InventoryButtonWrapper>
              <S.InventoryButton
                onClick={onSetInventoryEquip}
                className={currentInventory === 0 ? 'isActive' : ''}
              >
                장비
              </S.InventoryButton>
              <S.InventoryButton
                onClick={onSetInventoryUse}
                className={currentInventory === 1 ? 'isActive' : ''}
              >
                소비
              </S.InventoryButton>
              <S.InventoryButton
                onClick={onSetInventoryEtc}
                className={currentInventory === 2 ? 'isActive' : ''}
              >
                기타
              </S.InventoryButton>
              <S.InventoryButton
                onClick={onSetInventorySetup}
                className={currentInventory === 3 ? 'isActive' : ''}
              >
                설치
              </S.InventoryButton>
            </S.InventoryButtonWrapper>
            <S.ItemWrapper>
              {currentInventory === 0 &&
                invenEquip.map((item, idx) => (
                  <Item2 key={`${item}-${idx}`} item={item} />
                ))}
            </S.ItemWrapper>
          </S.InventoryBody>
        </S.Contianer>
      </Draggable>
    </div>
  )
}

export default Inventory
