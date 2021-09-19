import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import GlobalStyle from './style/GlobalStyle'
const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <GlobalStyle />
    </DndProvider>
  </Provider>,
  document.getElementById('root')
)
