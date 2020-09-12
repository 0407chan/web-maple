import React, { useState } from "react";
import useToolTip from "../hooks/useToolTip";
import "./ToolTip.scss";
import useInventory from "../hooks/useInventory";
import IMAGE from "../utils/images";

function ToolTip() {
  const { visible, mouseX, mouseY } = useToolTip();
  const { currItem } = useInventory();

  const position = {
    top: `0px`,
    left: `0px`,
  };

  // const position = {
  //   top: `${mouseY + 2}px`,
  //   left: `${mouseX + 2}px`,
  // };

  const itemGrade = () => {};

  const renderStar = () => {
    let starList = [];
    for (let i = 0; i < currItem.star; i++) {
      starList.push(IMAGE.tooltip.tooltip_Item_Star);
    }
    for (let i = currItem.star; i < currItem.max_star; i++) {
      starList.push(IMAGE.tooltip.tooltip_Item_Star_none);
    }
    return (
      <>
        {starList.map((star, idx) => {
          return idx % 5 === 4 ? (
            <>
              <img src={star} alt={`starimg` + idx} />
              <span> </span>
            </>
          ) : (
            <img src={star} alt={`starimg` + idx} />
          );
        })}
      </>
    );
  };
  return (
    <>
      {visible && (
        <div className="tooltip-wrapper" style={position}>
          <div className="tooltip-frame-top-img"></div>
          <div className="tooltip-frame-line-img">
            <div className="tooltip-header">
              <div className="tooltip-star">{renderStar()}</div>
              <div className="tooltip-name">
                {currItem.name}
                <span> (+{currItem.upgrade})</span>
              </div>
              <div className="tooltip-grade">(에픽 아이템)</div>
            </div>
          </div>
          <div className="tooltip-frame-dotline-img"></div>

          <div className="tooltip-frame-line-img">
            <div className="tooltip-image">
              <div className="item-icon-base">
                <img
                  alt="item-icon-base"
                  src={IMAGE.tooltip.tooltip_Item_Icon_base}
                />
                <div className="tooltip-item-img-content">
                  <img
                    className="tooltip-item-img"
                    src={currItem.image}
                    alt="item-img"
                  />
                  <img
                    className="item-icon-cover"
                    alt="item-cover"
                    src={IMAGE.tooltip.tooltip_Item_Icon_cover}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="tooltip-frame-bottom-img"></div>
        </div>
      )}
    </>
  );
}

export default ToolTip;
