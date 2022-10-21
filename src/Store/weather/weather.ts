import { GetCityAPIData, GetWeatherAPIData, Record } from '@/Interfaces/city'
import { cityApi } from '@/Services/city'
import { weatherApi } from '@/Services/weather'
import { createSlice } from '@reduxjs/toolkit'

export interface WeatherState {
  metaData: GetCityAPIData | undefined
  weatherData: GetWeatherAPIData | undefined
}

const initialState: WeatherState = {
  metaData: undefined,
  weatherData: undefined,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      cityApi.endpoints.getCity.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload
        state.metaData = data
      },
    )
    builder.addMatcher(
      weatherApi.endpoints.getWeather.matchFulfilled,
      (state, { payload }) => {
        state.weatherData = payload
      },
    )
  },
})

export const {} = weatherSlice.actions
const weatherReducer = weatherSlice.reducer
export default weatherReducer
