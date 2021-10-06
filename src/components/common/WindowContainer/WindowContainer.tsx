import { UiWindowType } from '@/feature/uiWindow/uiWindowSlice'
import useUiWindow from '@/hooks/useUiWindow'
import React from 'react'
import Draggable from 'react-draggable'
import * as S from './style'

type props = {
  windowType: UiWindowType
  title?: string
  footer?: React.ReactNode
  style?: React.CSSProperties
}
const WindowContainer: React.FC<props> = ({
  windowType,
  title,
  footer,
  style,
  children
}) => {
  const { isOpenedWindow, uiWindowList, onSetTop, onRemoveUiWindow } =
    useUiWindow()

  const removeUiWindow = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    onRemoveUiWindow(windowType)
  }
  return (
    <Draggable handle=".handle" bounds="body">
      <S.Contianer
        className="no-drag"
        style={{
          ...style,
          visibility: isOpenedWindow(windowType) ? 'visible' : 'hidden',
          zIndex:
            uiWindowList[uiWindowList.length - 1] === windowType ? 1 : undefined
        }}
        onClick={() => onSetTop(windowType)}
      >
        <S.Header className="handle">{title || ''}</S.Header>
        <S.CloseButton onClick={removeUiWindow}>✖</S.CloseButton>
        <S.Body>{children}</S.Body>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Contianer>
    </Draggable>
  )
}

export default WindowContainer
