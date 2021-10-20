import WindowContainer from '@/components/common/WindowContainer'
import React from 'react'
import { ControlPosition } from 'react-draggable'
import * as S from './style'

type Props = {
  position: ControlPosition
}
const InventorySection: React.FC<Props> = ({ position }) => {
  return (
    <WindowContainer
      hideCloseButton
      title="MY ITEMS"
      windowType="EquipmentStore"
      position={{ ...position, x: position.x + 330 + 10 }}
      canDrag={false}
    >
      <S.Vertical>
        <S.Contianer>
          <S.Horizontal>hello</S.Horizontal>
        </S.Contianer>
      </S.Vertical>
    </WindowContainer>
  )
}

export default InventorySection
