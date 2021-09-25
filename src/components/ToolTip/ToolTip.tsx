import useInventory from '@/hooks/useInventory'
import useToolTip from '@/hooks/useToolTip'
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
  const { mouseX, mouseY, visible } = useToolTip()
  const { getStatAttack } = useUser()

  if (!currentItem || !visible) return null

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
    PHYSICAL_DEFENCE,
    MAGICAL_DEFENCE,
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
    top: `${mouseY + 3}px`,
    left: `${mouseX + 3}px`
  }

  // const position = {
  //   top: positionY,
  //   left: positionX
  // }

  // const itemGrade = () => {}

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

  const renderStatus = (status: StatusBase) => {
    if (status.base + status.bonus + status.reinforce === 0) return
    return (
      <S.Status>
        <span
          className={`${
            (status.bonus > 0 || status.reinforce > 0) && 'add-color'
          }`}
        >
          {status.label} : +{status.base + status.bonus + status.reinforce}{' '}
        </span>
        {status.bonus > 0 && status.reinforce > 0 && (
          <>
            ({status.base}
            {status.bonus > 0 && (
              <span className="chu-color"> +{status.bonus}</span>
            )}
            {status.reinforce > 0 && (
              <span className="add-color"> +{status.reinforce}</span>
            )}
            )
          </>
        )}
      </S.Status>
    )
  }

  const renderStar = () => {
    const result = []
    let starBundle: { index: number; src: string }[] = []
    for (let i = 0; i < max_star; i++) {
      const imageSrc =
        i < star
          ? IMAGE.tooltip.tooltip_Item_Star
          : IMAGE.tooltip.tooltip_Item_Star_none
      starBundle.push({ index: i, src: imageSrc })
      if (i % 5 === 4) {
        result.push(
          <S.StarBundleWrapper key={i}>
            {starBundle.map((star) => (
              <img
                src={star.src}
                key={star.index}
                alt={`starimg-` + star.index}
              />
            ))}
          </S.StarBundleWrapper>
        )
        starBundle = []
      }
    }
    return result
  }

  return (
    <S.Contianer
      id="new-tooltip"
      style={position}
      onMouseEnter={(event) => event.stopPropagation()}
    >
      <S.StarWrapper>{renderStar()}</S.StarWrapper>
      <S.ItemNameWapper>
        <S.ItemName>
          {currentItem.name}
          {currentItem.upgrade > 0 && <span> (+{currentItem.upgrade})</span>}
        </S.ItemName>
        <S.ItemPotential>(에픽 아이템)</S.ItemPotential>
      </S.ItemNameWapper>
      <S.DotLine />
      <S.SectionBlock
        justifyContent="center"
        flexDirection="row"
        alignItems="flex-start"
      >
        <S.ImageWrapper>
          <S.Image src={currentItem.image} />
        </S.ImageWrapper>
        <S.AttackIncreaseWrapper>
          <S.AttackIncreaseLabel>공격력 증가량</S.AttackIncreaseLabel>
          <S.AttackIncrease>{getStatAttack(currentItem)}</S.AttackIncrease>
        </S.AttackIncreaseWrapper>
      </S.SectionBlock>
      <S.DotLine />
      <S.SectionBlock
        justifyContent="center"
        flexDirection="column"
        alignItems="flex-start"
      >
        <S.StatusWrapper>
          <div className="tooltip-category">분류 : {category}</div>
          {renderStatus(STR)}
          {renderStatus(DEX)}
          {renderStatus(INT)}
          {renderStatus(LUK)}
          {renderStatus(HP)}
          {renderStatus(MP)}
          {renderStatus(PHYSICAL_DEFENCE)}
          {renderStatus(MAGICAL_DEFENCE)}
          {renderStatus(WEAPON_ATTACK)}
          {renderStatus(MAGIC_ATTACK)}
          {renderStatus(AllStat)}
          {upgrade_avalable > 0 && upgrade_avalable !== undefined && (
            <div className="tooltip-upgrade">
              업그레이드 가능 횟수 : {upgrade_avalable}{' '}
              <span className="yellow-color">
                (복구 가능 횟수 : {max_upgrade - upgrade - upgrade_avalable})
              </span>
            </div>
          )}
        </S.StatusWrapper>
      </S.SectionBlock>
    </S.Contianer>
  )
}

export default ToolTip
