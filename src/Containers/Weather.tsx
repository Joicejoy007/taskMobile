import Icon from '@/Assets/Icons'
import { Config } from '@/Config'
import { useTheme } from '@/Hooks'
import { Record } from '@/Interfaces/city'
import { navigate } from '@/Navigators/utils'
import { useGetWeatherQuery } from '@/Services/weather'
import { Colors } from '@/Theme/Variables'
import { heightPixel, pixelSizeVertical, widthPixel } from '@/utils'
import { Routes } from '@/utils/routes'
import moment from 'moment'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Style } from './Style'

export default function Weather({ navigation, route }) {
  const { Layout, Gutters, Fonts, Images } = useTheme()

  const cityData = route?.params?.item as Record

  const { data, isLoading, isFetching } = useGetWeatherQuery({
    params: {
      lat: cityData?.coord?.lat,
      lon: cityData?.coord?.lon,
      appid: Config.WEATHER_APP_ID,
      units: 'metric',
      exclude: 'current,minutely,hourly,alerts',
    },
  })

  const weatherView = (weather: string) => {
    return (
      <View>
        <Image
          style={Style.iconView}
          resizeMode="contain"
          source={weather === 'Clear' ? Images.sunny : Images.cloud}
        />
        <Text
          style={[
            Fonts.textTiny,
            Fonts.textBold,
            { color: 'white' },
            Gutters.tinyRMargin,
          ]}
        >
          {weather}
        </Text>
      </View>
    )
  }

  const renderCity = () => {
    return (
      <TouchableOpacity
        onPress={() => navigate(Routes.City_Index, { item: cityData })}
        style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyTMargin]}
      >
        <Text
          style={[
            Fonts.textTiny,
            Fonts.textBold,
            { color: 'white' },
            Gutters.tinyRMargin,
          ]}
        >
          {cityData?.name}
        </Text>
        <Icon
          name={'ChevronDown'}
          width={widthPixel(15)}
          height={widthPixel(15)}
          viewBox="0 0 20 20"
          style={{
            transform: [{ rotate: '-90deg' }],
            marginTop: pixelSizeVertical(-8),
          }}
        />
      </TouchableOpacity>
    )
  }

  const renderWeatherWrapper = () => {
    return (
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
        ]}
      >
        <View>
          <Text style={[Fonts.textSmall, Fonts.textBold, { color: 'white' }]}>
            Current Weather
          </Text>
          {renderCity()}
        </View>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBold,
              Gutters.smallRMargin,
              { color: 'white' },
            ]}
          >
            {data?.daily?.[0]?.temp?.min}
          </Text>
          {weatherView(data?.daily?.[0]?.weather?.[0]?.main)}
        </View>
        {renderDateWrapper()}
      </View>
    )
  }

  const renderDateWrapper = () => {
    return (
      <View
        style={[Style.dateWrapper, Gutters.smallHPadding, Gutters.tinyVPadding]}
      >
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <Text
            style={[Fonts.textBold, Fonts.textSmall, { color: Colors.blue }]}
          >
            {moment().format('DD')}
          </Text>
          <Image
            style={[Style.iconView]}
            resizeMode="contain"
            source={Images.calender}
          />
        </View>
        <Text style={[Fonts.textBold, Fonts.textTiny]}>
          {moment().format('dddd').substring(0, 3) + moment().format(', YYYY')}
        </Text>
      </View>
    )
  }

  const renderListWrapper = () => {
    return (
      <View style={[Layout.row, Gutters.regularTMargin]}>
        {data?.daily?.map((el, index) => {
          if (index !== 0) {
            return (
              <View style={{ flex: 0.14 }}>
                {weatherView(el?.weather?.[0]?.main)}
              </View>
            )
          }
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={[Layout.fill]}>
      <LinearGradient colors={['#33CCFF', '#33CCCC', '#4DD0E1']}>
        <View
          style={[
            Gutters.regularHPadding,
            Gutters.smallTPadding,
            Gutters.regularBPadding,
          ]}
        >
          {renderWeatherWrapper()}
          {renderListWrapper()}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
