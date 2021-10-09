import MapleButton from '@/components/common/MapleButton'
import WindowContainer from '@/components/common/WindowContainer'
import { FlameSettingType, StatusSettingType } from '@/types/flame'
import { EquipItemType } from '@/types/inventory'
import { numberWithCommas } from '@/utils/number/numberWithCommas'
import React, { useEffect, useRef } from 'react'
import { ControlPosition } from 'react-draggable'
import * as S from './style'
import { StatusName } from './utils'

const WonImage = `${process.env.PUBLIC_URL}/images/money/won.png`

type Props = {
  position: ControlPosition
  statusSetting: StatusSettingType
  setStatusSetting: React.Dispatch<React.SetStateAction<StatusSettingType>>
  flameCostSetting: FlameSettingType
  setFlameCostSetting: React.Dispatch<React.SetStateAction<FlameSettingType>>
  mesoKrwSetting: number | undefined
  setMesoKrwSetting: React.Dispatch<React.SetStateAction<number | undefined>>
  item: EquipItemType | undefined
}
const StatusSetting: React.FC<Props> = ({
  position,
  item,
  statusSetting,
  flameCostSetting,
  setFlameCostSetting,
  setStatusSetting,
  mesoKrwSetting,
  setMesoKrwSetting
}) => {
  const isWeapon = () => item?.islots === 'Wp'
  const ref = useRef()
  const regex = /[^0-9, ]/g

  useEffect(() => {
    console.log(statusSetting)
  }, [statusSetting])
  useEffect(() => {
    if (item === undefined) {
      setStatusSetting({
        ...statusSetting,
        bossDemage: undefined,
        demage: undefined
      })
    }
  }, [item])

  return (
    <WindowContainer
      windowType="FlameOfResurrection"
      hideCloseButton
      title="STATUS SETTING"
      position={{ ...position, x: position.x - 290 }}
      canDrag={false}
    >
      <S.Vertical>
        <S.Contianer>
          <S.Horizontal>
            <S.Title>오토 세팅</S.Title>
            <MapleButton size="small" onClick={() => setStatusSetting({})}>
              초기화
            </MapleButton>
          </S.Horizontal>
          <S.Block>
            <S.Vertical>
              {renderStatusInput('STR')}
              {renderStatusInput('DEX')}
              {renderStatusInput('INT')}
              {renderStatusInput('LUK')}
              {renderStatusInput('WEAPON_ATTACK')}
              {renderStatusInput('MAGIC_ATTACK')}
              {renderStatusInput('bossDemage', !isWeapon())}
              {renderStatusInput('demage', !isWeapon())}
              {renderStatusInput('AllStat')}
            </S.Vertical>
          </S.Block>
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Title>환불 가격 세팅</S.Title>
          <S.Block>
            <S.Vertical>
              <S.Horizontal>
                <S.Text>
                  <img
                    src="https://maplestory.io/api/KMS/353/item/2048716/icon"
                    alt="powerImage"
                  />
                </S.Text>
                <S.Input
                  maxLength={11}
                  placeholder={'숫자를 입력해주세요.'}
                  value={
                    flameCostSetting.powerful !== undefined
                      ? numberWithCommas(flameCostSetting.powerful)
                      : undefined
                  }
                  onChange={(e) => {
                    const newValue = e.target.value
                      .replace(regex, '')
                      .replaceAll(',', '')
                    setFlameCostSetting({
                      ...flameCostSetting,
                      powerful: newValue ? Number(newValue) : undefined
                    })
                  }}
                />
              </S.Horizontal>
              <S.Horizontal>
                <S.Text>
                  <img
                    src="https://maplestory.io/api/KMS/353/item/2048717/icon"
                    alt="foreverImage"
                  />
                </S.Text>
                <S.Input
                  maxLength={11}
                  placeholder={'숫자를 입력해주세요.'}
                  value={
                    flameCostSetting.eternal !== undefined
                      ? numberWithCommas(flameCostSetting.eternal)
                      : undefined
                  }
                  onChange={(e) => {
                    const newValue = e.target.value
                      .replace(regex, '')
                      .replaceAll(',', '')
                    setFlameCostSetting({
                      ...flameCostSetting,
                      eternal: newValue ? Number(newValue) : undefined
                    })
                  }}
                />
              </S.Horizontal>
            </S.Vertical>
          </S.Block>
        </S.Contianer>
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Title>1억 메소당</S.Title>
          <S.Block>
            <S.Horizontal>
              <S.Text>
                <img width={30} src={WonImage} alt="one" />
              </S.Text>
              <S.Input
                maxLength={5}
                placeholder={'숫자를 입력해주세요.'}
                value={
                  mesoKrwSetting !== undefined
                    ? numberWithCommas(mesoKrwSetting)
                    : undefined
                }
                onChange={(e) => {
                  const newValue = e.target.value
                    .replace(regex, '')
                    .replaceAll(',', '')
                  setMesoKrwSetting(newValue ? Number(newValue) : undefined)
                }}
              />
            </S.Horizontal>
          </S.Block>
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )

  function renderStatusInput(
    type: keyof StatusSettingType,
    disabled?: boolean
  ) {
    return (
      <S.Horizontal>
        <S.Text>{StatusName[type]}</S.Text>
        <S.Input
          maxLength={3}
          placeholder={
            disabled ? '무기를 선택해주세요' : '숫자를 입력해주세요.'
          }
          value={statusSetting[type]}
          disabled={disabled}
          onChange={(e) => {
            const newValue = e.target.value.replace(regex, '')
            setStatusSetting({
              ...statusSetting,
              [type]: newValue ? Number(newValue) : undefined
            })
          }}
        />
      </S.Horizontal>
    )
  }
}

export default StatusSetting
