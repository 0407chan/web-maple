import { ButtonProps } from 'antd/lib'
import React from 'react'
import * as S from './style'
const MapleButton: React.FC<ButtonProps> = ({ ...props }) => {
  return <S.Button {...props}></S.Button>
}

export default MapleButton
