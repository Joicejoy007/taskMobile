import { cityApi } from '@/Services/city'
import { weatherApi } from '@/Services/weather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import theme from './Theme'
import weatherReducer from './weather/weather'

const reducers = combineReducers({
  theme,
  state: weatherReducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'state'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares: any[] = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([cityApi.middleware, weatherApi.middleware])

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

export type RootState = ReturnType<typeof store.getState>

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
