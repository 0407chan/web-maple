import { UiWindowType } from '@/feature/uiWindow/uiWindowSlice'
import useUiWindow from '@/hooks/useUiWindow'
import React from 'react'
import Draggable from 'react-draggable'
import * as S from './style'

type props = {
  windowType: UiWindowType
  title?: string
}
const WindowContainer: React.FC<props> = ({ windowType, title, children }) => {
  const { isOpenedWindow, uiWindowList, onSetTop } = useUiWindow()

  return (
    <Draggable handle=".handle" bounds="body">
      <S.Contianer
        style={{
          visibility: isOpenedWindow(windowType) ? 'visible' : 'hidden',
          zIndex:
            uiWindowList[uiWindowList.length - 1] === windowType ? 1 : undefined
        }}
        onClick={() => onSetTop(windowType)}
      >
        <S.Header className="handle">{title}</S.Header>
        <S.Body>
          <S.Content>{children}</S.Content>
        </S.Body>
      </S.Contianer>
    </Draggable>
  )
}

export default WindowContainer
