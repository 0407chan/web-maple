import MapleButton from '@/components/common/MapleButton'
import WindowContainer from '@/components/common/WindowContainer'
import { StatusSettingType } from '@/types/flame'
import { EquipItemType } from '@/types/inventory'
import React, { useEffect, useRef } from 'react'
import { ControlPosition } from 'react-draggable'
import * as S from './style'
import { StatusName } from './utils'

type Props = {
  position: ControlPosition
  statusSetting: StatusSettingType
  setStatusSetting: React.Dispatch<React.SetStateAction<StatusSettingType>>
  item: EquipItemType | undefined
}
const StatusSetting: React.FC<Props> = ({
  position,
  item,
  statusSetting,
  setStatusSetting
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
            </S.Vertical>
          </S.Block>
        </S.Contianer>
        <S.Contianer>
          <S.Title>환불 가격 세팅</S.Title>
          <S.Block>
            <input onChange={(e) => console.log(e.target.value)}></input>
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
