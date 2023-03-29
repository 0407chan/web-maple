import { DndProvider } from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'

import { store } from './redux/store'
import './style/custom-style.scss'
import GlobalStyle from './style/GlobalStyle'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      keepPreviousData: true
    }
  }
})

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DndProvider options={HTML5toTouch}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <GlobalStyle />
      </DndProvider>
    </PersistGate>
  </Provider>
)
