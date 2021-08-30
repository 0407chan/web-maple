import useInventory from '@/hooks/useInventory'
import useUser from '@/hooks/useUser'
import { StatusBase } from '@/types/inventory'
import IMAGE from '@/utils/images'
import React from 'react'
import * as S from './style'

type ToolTipProps = {
  positionX: number
  positionY: number
}
const ToolTip: React.FC<ToolTipProps> = ({ positionX, positionY }) => {
  const { currentItem } = useInventory()
  const { getStatAttack } = useUser()

  if (!currentItem) return null
  const {
    job,
    category,
    star,
    STR,
    DEX,
    INT,
    LUK,
    HP,
    MP,
    AllStat,
    WEAPON_ATTACK,
    MAGIC_ATTACK,
    max_star,
    upgrade,
    max_upgrade,
    upgrade_avalable
  } = currentItem

  // // const position = {
  // //   top: `0px`,
  // //   left: `0px`,
  // // };

  const position = {
    top: positionY,
    left: positionX
  }

  // const itemGrade = () => {}

  const renderStar = () => {
    const starList = []
    for (let i = 0; i < star; i++) {
      starList.push(IMAGE.tooltip.tooltip_Item_Star)
    }
    for (let i = star; i < max_star; i++) {
      starList.push(IMAGE.tooltip.tooltip_Item_Star_none)
    }
    return (
      <>
        {starList.map((star, idx) => {
          return idx % 5 === 4 ? (
            <React.Fragment key={idx}>
              <img src={star} alt={`starimg` + idx} />
              <span> </span>
            </React.Fragment>
          ) : (
            <img key={idx} src={star} alt={`starimg` + idx} />
          )
        })}
      </>
    )
  }

  const renderItemInfo = () => {
    return (
      <div className="tooltip-frame-line-img">
        <div className="tooltip-image">
          <S.Horizontal
            style={{ justifyContent: 'space-between', width: '100%' }}
          >
            <div className="item-icon-base">
              <img
                alt="item-icon-base"
                src={IMAGE.tooltip.tooltip_Item_Icon_base}
              />
              <div className="tooltip-item-img-content">
                <img
                  className="tooltip-item-img"
                  src={currentItem.image}
                  alt="item-img"
                />
                <img
                  className="item-icon-cover"
                  alt="item-cover"
                  src={IMAGE.tooltip.tooltip_Item_Icon_cover}
                />
              </div>
            </div>
            <S.AttackIncreaseWrapper>
              <S.AttackIncreaseLabel>공격력 증가량</S.AttackIncreaseLabel>
              <S.AttackIncrease>{getStatAttack(currentItem)}</S.AttackIncrease>
            </S.AttackIncreaseWrapper>
          </S.Horizontal>
        </div>
      </div>
    )
  }

  const renderItemDetail = () => {
    return (
      <div className="tooltip-frame-line-img">
        <div className="tooltip-detail-wrapper">
          <div className="tooltip-category">무기분류 : {category}</div>
          {renderStatus(STR)}
          {renderStatus(DEX)}
          {renderStatus(INT)}
          {renderStatus(LUK)}
          {renderStatus(HP)}
          {renderStatus(MP)}
          {renderStatus(WEAPON_ATTACK)}
          {renderStatus(MAGIC_ATTACK)}
          {renderStatus(AllStat)}
          <div className="tooltip-upgrade">
            업그레이드 가능 횟수 : {upgrade_avalable}{' '}
            <span className="yellow-color">
              (복구 가능 횟수 : {max_upgrade - upgrade - upgrade_avalable})
            </span>
          </div>
        </div>
      </div>
    )
  }
  const renderStatus = (status: StatusBase) => {
    if (status.base + status.bonus + status.reinforce === 0) return
    return (
      <div className="tooltip-str">
        <span
          className={`${
            (status.bonus > 0 || status.reinforce > 0) && 'add-color'
          }`}
        >
          {status.label} : +{status.base + status.bonus + status.reinforce}{' '}
        </span>
        ({status.base}
        {status.bonus > 0 && (
          <span className="chu-color"> +{status.bonus}</span>
        )}
        {status.reinforce > 0 && (
          <span className="add-color"> +{status.reinforce}</span>
        )}
        )
      </div>
    )
  }
  return (
    <S.Contianer id="new-tooltip" style={position}>
      <div>
        <div className="tooltip-frame-top-img"></div>
        <div className="tooltip-frame-line-img">
          <div className="tooltip-header">
            <div className="tooltip-star">{renderStar()}</div>
            <div className="tooltip-name">
              {currentItem.name}
              {currentItem.upgrade > 0 && (
                <span> (+{currentItem.upgrade})</span>
              )}
            </div>
            <div className="tooltip-grade">(에픽 아이템)</div>
          </div>
        </div>
      </div>
      <div className="tooltip-frame-dotline-img"></div>
      {renderItemInfo()}
      <div className="tooltip-frame-dotline-img"></div>
      {renderItemDetail()}
      <div className="tooltip-frame-bottom-img"></div>
    </S.Contianer>
  )
}

export default ToolTip
