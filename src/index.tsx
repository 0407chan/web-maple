import React from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import './style/custom-style.scss'
import GlobalStyle from './style/GlobalStyle'

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <DndProvider options={HTML5toTouch}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <GlobalStyle />
    </DndProvider>
  </Provider>,
  document.getElementById('root')
)
