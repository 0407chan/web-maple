import WindowContainer from '@/components/common/WindowContainer'
import { EquipItemType } from '@/types/inventory'
import { StarForceSetting } from '@/types/star-force'
import { numberWithCommas } from '@/utils/number/numberWithCommas'
import React, { useEffect, useState } from 'react'
import { ControlPosition } from 'react-draggable'
import * as S from './style'

const WonImage = `${process.env.PUBLIC_URL}/images/money/won.png`

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
        <S.Contianer>
          <S.Title>강화 목표</S.Title>
          <S.Block
            isLoading={loading}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <S.Input
              style={{
                backgroundColor: '#ffffff',
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
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
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
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Title>1억 메소당</S.Title>
          <S.Block isLoading={loading}>
            <S.Horizontal>
              <S.Text>
                <img width={30} src={WonImage} alt="one" />
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
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )
}

export default StatusSetting
