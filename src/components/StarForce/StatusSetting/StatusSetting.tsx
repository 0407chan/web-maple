import Checkbox from 'antd/lib/checkbox'
import WindowContainer from 'components/common/WindowContainer'
import React, { useEffect, useState } from 'react'
import { ControlPosition } from 'react-draggable'
import { EquipItemType } from 'types/inventory'
import { StarForceSetting } from 'types/star-force'
import { IMAGE } from 'utils/images'
import { numberWithCommas } from 'utils/number/numberWithCommas'
import * as S from './style'

type Props = {
  position: ControlPosition
  loading: boolean
  starForceSetting: StarForceSetting
  setStarForceSetting: React.Dispatch<React.SetStateAction<StarForceSetting>>
  item: EquipItemType | undefined
}
const StatusSetting: React.FC<Props> = ({
  position,
  loading,
  item,
  starForceSetting,
  setStarForceSetting
}) => {
  const regex = /[^0-9, ]/g
  const [max, setMax] = useState<number>(0)
  useEffect(() => {
    if (!item) return

    setMax(item.maxStar)
    if (starForceSetting.star && starForceSetting.star > item.maxStar)
      setStarForceSetting({
        ...starForceSetting,
        star: item.maxStar
      })
  }, [item])
  return (
    <WindowContainer
      windowType="EquipmentEnchant"
      hideCloseButton
      title="STAR FORCE SETTING"
      position={{ ...position, x: position.x - 290 }}
      canDrag={false}
    >
      <S.Vertical>
        <S.Container>
          <S.Title>강화 목표</S.Title>
          <S.Block
            isLoading={loading}
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <S.Input
              style={{
                backgroundColor: '#ffffff',
                marginLeft: 20,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                width: 70
              }}
              bordered={false}
              maxLength={2}
              max={max}
              min={0}
              value={
                starForceSetting.star !== undefined
                  ? numberWithCommas(starForceSetting.star)
                  : undefined
              }
              onChange={(e) => {
                let newValue = e.target.value
                  .replace(regex, '')
                  .replaceAll(',', '')
                if (item && newValue && Number(newValue) > item.maxStar) {
                  newValue = `${item.maxStar}`
                }

                setStarForceSetting({
                  ...starForceSetting,
                  star: newValue ? Number(newValue) : undefined
                })
              }}
            />
            <S.Title style={{ color: 'black', fontSize: 20 }}>성</S.Title>
          </S.Block>
        </S.Container>
        <S.Container style={{ marginTop: 10 }}>
          <S.Title>스타포스 이벤트</S.Title>
          <S.Block isLoading={loading}>
            <S.Vertical
              style={{ justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <Checkbox
                checked={starForceSetting.eventOnePlusOne}
                disabled={item?.isSuperior}
                onChange={(event) =>
                  setStarForceSetting({
                    ...starForceSetting,
                    eventOnePlusOne: event.target.checked
                  })
                }
              >
                <S.Text>10성 이하 1+1</S.Text>
              </Checkbox>
              <Checkbox
                style={{ margin: 0 }}
                disabled={item?.isSuperior}
                checked={starForceSetting.event30Percent}
                onChange={(event) =>
                  setStarForceSetting({
                    ...starForceSetting,
                    event30Percent: event.target.checked
                  })
                }
              >
                <S.Text>스타포스 가격 30% 할인</S.Text>
              </Checkbox>
              <Checkbox
                style={{ margin: 0 }}
                disabled={item?.isSuperior}
                checked={starForceSetting.event1516}
                onChange={(event) =>
                  setStarForceSetting({
                    ...starForceSetting,
                    event1516: event.target.checked
                  })
                }
              >
                <S.Text>5성,10성,15성에서 100%</S.Text>
              </Checkbox>
            </S.Vertical>
          </S.Block>
        </S.Container>
        <S.Container style={{ marginTop: 10 }}>
          <S.Title>노작 가격</S.Title>
          <S.Block isLoading={loading}>
            <S.Horizontal>
              {item && (
                <S.Text>
                  <img src={item.image} alt="itemImage" />
                </S.Text>
              )}
              <S.Input
                maxLength={14}
                placeholder={'숫자를 입력해주세요.'}
                value={
                  starForceSetting.itemCost !== undefined
                    ? numberWithCommas(starForceSetting.itemCost)
                    : undefined
                }
                onChange={(e) => {
                  const newValue = e.target.value
                    .replace(regex, '')
                    .replaceAll(',', '')
                  setStarForceSetting({
                    ...starForceSetting,
                    itemCost: newValue ? Number(newValue) : undefined
                  })
                }}
              />
            </S.Horizontal>
          </S.Block>
        </S.Container>
        <S.Container style={{ marginTop: 10 }}>
          <S.Title>1억 메소당</S.Title>
          <S.Block isLoading={loading}>
            <S.Horizontal>
              <S.Text>
                <img width={30} src={IMAGE.WON} alt="one" />
              </S.Text>
              <S.Input
                maxLength={5}
                placeholder={'숫자를 입력해주세요.'}
                value={
                  starForceSetting.exchangeRate !== undefined
                    ? numberWithCommas(starForceSetting.exchangeRate)
                    : undefined
                }
                onChange={(e) => {
                  const newValue = e.target.value
                    .replace(regex, '')
                    .replaceAll(',', '')
                  setStarForceSetting({
                    ...starForceSetting,
                    exchangeRate: newValue ? Number(newValue) : undefined
                  })
                }}
              />
            </S.Horizontal>
          </S.Block>
        </S.Container>
      </S.Vertical>
    </WindowContainer>
  )
}

export default StatusSetting
