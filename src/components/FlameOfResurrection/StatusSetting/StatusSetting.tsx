import MapleButton from 'components/common/MapleButton'
import WindowContainer from 'components/common/WindowContainer'
import React, { useEffect } from 'react'
import { ControlPosition } from 'react-draggable'
import {
  AutoType,
  FlameSettingType,
  SimpleStatusSettingType,
  StatType,
  StatusSettingType
} from 'types/flame'
import { EquipItemType } from 'types/inventory'
import { numberWithCommas } from 'utils/number/numberWithCommas'
import { isMasicAttack, isWeapon } from '../utils'
import { StatusName } from './contants'
import * as S from './style'

const WonImage = `${import.meta.env.PUBLIC_URL}/images/money/won.png`

const AutoTypeName: Record<AutoType, string> = {
  DETAIL: '상세모드',
  SIMPLE: '간편모드'
}
type Props = {
  position: ControlPosition
  loading: boolean
  statusSetting: StatusSettingType
  setStatusSetting: React.Dispatch<React.SetStateAction<StatusSettingType>>
  flameCostSetting: FlameSettingType
  setFlameCostSetting: React.Dispatch<React.SetStateAction<FlameSettingType>>
  mesoKrwSetting: number | undefined
  setMesoKrwSetting: React.Dispatch<React.SetStateAction<number | undefined>>
  item: EquipItemType | undefined
  autoType: AutoType
  setAutoType: React.Dispatch<React.SetStateAction<AutoType>>
  simpleStatusSetting: SimpleStatusSettingType
  setSimpleStatusSetting: React.Dispatch<
    React.SetStateAction<SimpleStatusSettingType>
  >
}
const StatusSetting: React.FC<Props> = ({
  position,
  loading,
  item,
  statusSetting,
  flameCostSetting,
  setFlameCostSetting,
  setStatusSetting,
  mesoKrwSetting,
  setMesoKrwSetting,
  autoType,
  setAutoType,
  simpleStatusSetting,
  setSimpleStatusSetting
}) => {
  const regex = /[^0-9]/g

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
            <S.Horizontal style={{ justifyContent: 'flex-start', gap: 8 }}>
              <S.Title>오토 세팅</S.Title>
              <MapleButton
                size="small"
                disabled={loading}
                onClick={() =>
                  setAutoType(autoType === 'DETAIL' ? 'SIMPLE' : 'DETAIL')
                }
              >
                {AutoTypeName[autoType]}
              </MapleButton>
            </S.Horizontal>
            <MapleButton
              disabled={loading}
              size="small"
              onClick={() => {
                setStatusSetting({})
                setSimpleStatusSetting({
                  statType: 'STR',
                  allStatPerStat: 10,
                  attackPerStat: 4
                })
              }}
            >
              초기화
            </MapleButton>
          </S.Horizontal>
          {/* 간편 모드 */}
          {autoType === 'SIMPLE' && (
            <S.Block isLoading={loading}>
              {item ? (
                isWeapon(item) ? (
                  <S.Vertical style={{ alignItems: 'flex-start' }}>
                    {renderSimpleStatusSettingForWeapon(
                      isMasicAttack(item) ? 'MAGIC_ATTACK' : 'WEAPON_ATTACK',
                      'attackGrage'
                    )}
                    {renderSimpleStatusSettingForWeapon(
                      'bossDemage',
                      'bossGrade'
                    )}
                    {renderSimpleStatusSettingForWeapon(
                      'demage',
                      'demageGrade'
                    )}
                    {renderSimpleStatusSettingForWeapon(
                      'AllStat',
                      'allStatGrade'
                    )}
                  </S.Vertical>
                ) : (
                  <S.Vertical>
                    <S.RadioGroup
                      value={simpleStatusSetting.statType}
                      buttonStyle="solid"
                      optionType="button"
                      size="small"
                      options={[
                        { value: 'STR', label: 'STR' },
                        { value: 'DEX', label: 'DEX' },
                        { value: 'INT', label: 'INT' },
                        { value: 'LUK', label: 'LUK' },
                        { value: 'ALL', label: '아무거나' }
                      ]}
                      onChange={(e) => {
                        const key = e.target.value as StatType
                        setSimpleStatusSetting({
                          ...simpleStatusSetting,
                          statType: key
                        })
                      }}
                    />
                    <S.Input
                      maxLength={3}
                      min={0}
                      placeholder="수치를 입력해주세요"
                      value={simpleStatusSetting.expectStat}
                      suffix="급"
                      onChange={(e) => {
                        const newValue = e.target.value
                          .replace(regex, '')
                          .replaceAll(',', '')
                        setSimpleStatusSetting({
                          ...simpleStatusSetting,
                          expectStat: newValue ? Number(newValue) : undefined
                        })
                      }}
                    />
                  </S.Vertical>
                )
              ) : (
                '아이템을 선택해주세요.'
              )}
            </S.Block>
          )}

          {/* 상세 모드 */}
          {autoType === 'DETAIL' && (
            <S.Block isLoading={loading}>
              <S.Vertical>
                {renderStatusInput('STR')}
                {renderStatusInput('DEX')}
                {renderStatusInput('INT')}
                {renderStatusInput('LUK')}
                {renderStatusInput('HP', false, 4)}
                {renderStatusInput('WEAPON_ATTACK')}
                {renderStatusInput('MAGIC_ATTACK')}
                {renderStatusInput('bossDemage', !isWeapon(item))}
                {renderStatusInput('demage', !isWeapon(item))}
                {renderStatusInput('AllStat')}
              </S.Vertical>
            </S.Block>
          )}
        </S.Contianer>
        {autoType === 'SIMPLE' && (
          <S.Contianer style={{ marginTop: 10 }}>
            <S.Title>스텟 세팅</S.Title>
            <S.Block isLoading={loading}>
              <S.Vertical>
                <S.Horizontal>
                  <S.Text style={{ width: '100%' }}>
                    {simpleStatusSetting.statType === 'INT' ? '마력' : '공격력'}{' '}
                    1
                  </S.Text>
                  <S.Text style={{ width: 'fit-content' }}>=</S.Text>
                  <S.InputNumber
                    max={9.9}
                    min={0}
                    step={0.1}
                    size="small"
                    style={{ width: '100%' }}
                    placeholder={'숫자를 입력해주세요.'}
                    value={simpleStatusSetting.attackPerStat}
                    onChange={(value) => {
                      const newValue = Number(value).toFixed(1)
                      setSimpleStatusSetting({
                        ...simpleStatusSetting,
                        attackPerStat: newValue ? Number(newValue) : undefined
                      })
                    }}
                  />
                </S.Horizontal>
                <S.Horizontal>
                  <S.Text style={{ width: '100%' }}>올스텟 1%</S.Text>
                  <S.Text style={{ width: 'fit-content' }}>=</S.Text>
                  <S.InputNumber
                    max={19.9}
                    min={0}
                    step={0.1}
                    size="small"
                    style={{ width: '100%' }}
                    placeholder={'숫자를 입력해주세요.'}
                    value={simpleStatusSetting.allStatPerStat}
                    onChange={(value) => {
                      const newValue = Number(value).toFixed(1)
                      setSimpleStatusSetting({
                        ...simpleStatusSetting,
                        allStatPerStat: newValue ? Number(newValue) : undefined
                      })
                    }}
                  />
                </S.Horizontal>
              </S.Vertical>
            </S.Block>
          </S.Contianer>
        )}
        <S.Contianer style={{ marginTop: 10 }}>
          <S.Title>환불 가격 세팅</S.Title>
          <S.Block isLoading={loading}>
            <S.Vertical>
              <S.Horizontal>
                <S.Text>
                  <img
                    src={`https://maplestory.io/api/${
                      import.meta.env.VITE_REGION
                    }/${import.meta.env.VITE_VERSION}/item/2048716/icon`}
                    alt="powerImage"
                  />
                </S.Text>
                <S.Input
                  maxLength={11}
                  placeholder={'숫자를 입력해주세요.'}
                  value={
                    flameCostSetting.POWERFUL !== undefined
                      ? numberWithCommas(flameCostSetting.POWERFUL)
                      : undefined
                  }
                  onChange={(e) => {
                    const newValue = e.target.value
                      .replace(regex, '')
                      .replaceAll(',', '')
                    setFlameCostSetting({
                      ...flameCostSetting,
                      POWERFUL: newValue ? Number(newValue) : undefined
                    })
                  }}
                />
              </S.Horizontal>
              <S.Horizontal>
                <S.Text>
                  <img
                    src={`https://maplestory.io/api/${
                      import.meta.env.VITE_REGION
                    }/${import.meta.env.VITE_VERSION}/item/2048717/icon`}
                    alt="foreverImage"
                  />
                </S.Text>
                <S.Input
                  maxLength={11}
                  placeholder={'숫자를 입력해주세요.'}
                  value={
                    flameCostSetting.ETERNAL !== undefined
                      ? numberWithCommas(flameCostSetting.ETERNAL)
                      : undefined
                  }
                  onChange={(e) => {
                    const newValue = e.target.value
                      .replace(regex, '')
                      .replaceAll(',', '')
                    setFlameCostSetting({
                      ...flameCostSetting,
                      ETERNAL: newValue ? Number(newValue) : undefined
                    })
                  }}
                />
              </S.Horizontal>
            </S.Vertical>
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
    disabled?: boolean,
    maxLength = 3
  ) {
    return (
      <S.Horizontal>
        <S.Text>{StatusName[type]}</S.Text>
        <S.Input
          maxLength={maxLength}
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

  function renderSimpleStatusSettingForWeapon(
    type: keyof StatusSettingType,
    simpleKey: keyof SimpleStatusSettingType
  ) {
    if (!item) return null
    return (
      <S.Horizontal style={{ gap: 0 }}>
        <S.Text style={{ width: 'fit-content' }}>{StatusName[type]}</S.Text>
        <S.RadioGroup
          optionType="button"
          size="small"
          buttonStyle="solid"
          value={
            simpleStatusSetting[simpleKey] !== undefined
              ? simpleStatusSetting[simpleKey]
              : 0
          }
          options={[
            { label: '없음', value: 0 },
            { label: '1추', value: 1 },
            { label: '2추', value: 2 },
            { label: '3추', value: 3 },
            { label: '4추', value: 4 }
          ]}
          onChange={(e) =>
            setSimpleStatusSetting({
              ...simpleStatusSetting,
              [simpleKey]: e.target.value === 0 ? undefined : e.target.value
            })
          }
        />
      </S.Horizontal>
    )
  }
}

export default StatusSetting
