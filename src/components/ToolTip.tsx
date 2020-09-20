import React, { useState } from "react";
import useToolTip from "../hooks/useToolTip";
import "./ToolTip.scss";
import useInventory from "../hooks/useInventory";
import IMAGE from "../utils/images";
import { reduceEachTrailingCommentRange } from "typescript";

function ToolTip() {
  const { visible, mouseX, mouseY } = useToolTip();
  const { currItem } = useInventory();
  const {
    job,
    category,
    baseStr,
    chuStr,
    addStr,
    baseDex,
    chuDex,
    addDex,
    baseInt,
    chuInt,
    addInt,
    baseLuk,
    chuLuk,
    addLuk,
    baseHP,
    chuHP,
    addHP,
    baseMP,
    chuMP,
    addMP,
    baseWA,
    chuWA,
    addWA,
    baseMA,
    chuMA,
    addMA,
    baseAllStat,
    chuAllStat,
    addAllStat,
    upgrade,
    max_upgrade,
    upgrade_avalable,
  } = currItem;

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
              <img key={idx} src={star} alt={`starimg` + idx} />
              <span> </span>
            </>
          ) : (
            <img key={idx} src={star} alt={`starimg` + idx} />
          );
        })}
      </>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <div className="tooltip-frame-top-img"></div>
        <div className="tooltip-frame-line-img">
          <div className="tooltip-header">
            <div className="tooltip-star">{renderStar()}</div>
            <div className="tooltip-name">
              {currItem.name}
              {upgrade > 0 && <span> (+{upgrade})</span>}
            </div>
            <div className="tooltip-grade">(에픽 아이템)</div>
          </div>
        </div>
      </>
    );
  };

  const renderDotLine = () => {
    return <div className="tooltip-frame-dotline-img"></div>;
  };

  const renderItemInfo = () => {
    return (
      <div className="tooltip-frame-line-img">
        <div className="tooltip-info">
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

          <div className="tooltip-info-contents">
            <div className="tooltip-damage-increase__text">공격력 증가량</div>
          </div>
        </div>
      </div>
    );
  };
  const renderItemDetail = () => {
    return (
      <div className="tooltip-frame-line-img">
        <div className="tooltip-detail-wrapper">
          <div className="tooltip-category">무기분류 : {category}</div>
          {renderStr()}
          {renderDex()}
          {renderInt()}
          {renderLuk()}
          {renderHp()}
          {renderMp()}
          {renderWeaponAttack()}
          {renderMagicAttack()}
          <div className="tooltip-upgrade">
            업그레이드 가능 횟수 : {upgrade_avalable}{" "}
            <span className="yellow-color">
              (복구 가능 횟수 : {max_upgrade - upgrade - upgrade_avalable})
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderStr = () => {
    if (baseStr + chuStr + addStr === 0) return;
    return (
      <div className="tooltip-str">
        <span className={`${(chuStr > 0 || addStr > 0) && "add-color"}`}>
          STR : +{baseStr + chuStr + addStr}{" "}
        </span>
        ({baseStr}
        {chuStr > 0 && <span className="chu-color"> +{chuStr}</span>}
        {addStr > 0 && <span className="add-color"> +{addStr}</span>})
      </div>
    );
  };

  const renderDex = () => {
    if (baseDex + chuDex + addDex === 0) return;

    return (
      <div className="tooltip-dex">
        <span className={`${(chuDex > 0 || addDex > 0) && "add-color"}`}>
          DEX : +{baseDex + chuDex + addDex}{" "}
        </span>
        ({baseDex}
        {chuDex > 0 && <span className="chu-color"> +{chuDex}</span>}
        {addDex > 0 && <span className="add-color"> +{addDex}</span>})
      </div>
    );
  };

  const renderInt = () => {
    if (baseInt + chuInt + addInt === 0) return;

    return (
      <div className="tooltip-int">
        <span className={`${(chuInt > 0 || addInt > 0) && "add-color"}`}>
          INT : +{baseInt + chuInt + addInt}{" "}
        </span>
        ({baseInt}
        {chuInt > 0 && <span className="chu-color"> +{chuInt}</span>}
        {addInt > 0 && <span className="add-color"> +{addInt}</span>})
      </div>
    );
  };

  const renderLuk = () => {
    if (baseLuk + chuLuk + addLuk === 0) return;

    return (
      <div className="tooltip-luk">
        <span className={`${(chuLuk > 0 || addLuk > 0) && "add-color"}`}>
          LUK : +{baseLuk + chuLuk + addLuk}{" "}
        </span>
        ({baseLuk}
        {chuLuk > 0 && <span className="chu-color"> +{chuLuk}</span>}
        {addLuk > 0 && <span className="add-color"> +{addLuk}</span>})
      </div>
    );
  };

  const renderHp = () => {
    if (baseHP + chuHP + addHP === 0) return;

    return (
      <div className="tooltip-hp">
        <span className={`${(chuHP > 0 || addHP > 0) && "add-color"}`}>
          최대 HP : +{baseHP + chuHP + addHP}{" "}
        </span>
        ({baseHP}
        {chuHP > 0 && <span className="chu-color"> +{chuHP}</span>}
        {addHP > 0 && <span className="add-color"> +{addHP}</span>})
      </div>
    );
  };

  const renderMp = () => {
    if (baseMP + chuMP + addMP === 0) return;

    return (
      <div className="tooltip-mp">
        <span className={`${(chuMP > 0 || addMP > 0) && "add-color"}`}>
          최대 MP : +{baseMP + chuMP + addMP}{" "}
        </span>
        ({baseMP}
        {chuMP > 0 && <span className="chu-color"> +{chuMP}</span>}
        {addMP > 0 && <span className="add-color"> +{addMP}</span>})
      </div>
    );
  };

  const renderWeaponAttack = () => {
    if (baseWA + chuWA + addWA === 0) return;

    return (
      <div className="tooltip-wa">
        <span className={`${(chuWA > 0 || addWA > 0) && "add-color"}`}>
          공격력 : +{baseWA + chuWA + addWA}{" "}
        </span>
        ({baseWA}
        {chuWA > 0 && <span className="chu-color"> +{chuWA}</span>}
        {addWA > 0 && <span className="add-color"> +{addWA}</span>})
      </div>
    );
  };

  const renderMagicAttack = () => {
    if (baseMA + chuMA + addMA === 0) return;

    return (
      <div className="tooltip-ma">
        <span className={`${(chuMA > 0 || addMA > 0) && "add-color"}`}>
          마력 : +{baseMA + chuMA + addMA}{" "}
        </span>
        ({baseMA}
        {chuMA > 0 && <span className="chu-color"> +{chuMA}</span>}
        {addMA > 0 && <span className="add-color"> +{addMA}</span>})
      </div>
    );
  };

  const renderPotential = () => {};
  const renderAdditianal = () => {};

  return (
    <>
      {visible && (
        <div className="tooltip-wrapper" style={position}>
          {renderHeader()}
          {renderDotLine()}
          {renderItemInfo()}
          {renderDotLine()}
          {renderItemDetail()}
          <div className="tooltip-frame-bottom-img"></div>
        </div>
      )}
    </>
  );
}

export default ToolTip;
