import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../state/reducers'
import rootSaga from '../state/sagas'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()

// Root store
export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}
