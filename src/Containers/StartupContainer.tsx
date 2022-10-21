import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import TextField from '@/Components/TextField'
import Icon from '@/Assets/Icons'
import { pixelSizeHorizontal, widthPixel } from '@/utils'
import { Style } from './Style'
import { Colors } from '@/Theme/Variables'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store'
import { Record } from '@/Interfaces/city'
import { useGetCityQuery } from '@/Services/city'
import { goBack, navigate } from '@/Navigators/utils'
import { Routes } from '@/utils/routes'

const StartupContainer = ({ navigation, route }) => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const cityState = useSelector((state: RootState) => state.state)

  const [cityList, setCityList] = useState<Record[]>([])

  const [searchText, setSearchText] = useState('')

  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching } = useGetCityQuery({
    params: {
      page,
      search: searchText.toLowerCase(),
    },
  })

  const headerLeft = () => {
    return (
      <TouchableOpacity
        onPress={goBack}
        style={[Layout.center, Gutters.regularLPadding, Gutters.smallTPadding]}
      >
        <Icon
          name="ChevronBack"
          width={widthPixel(20)}
          height={widthPixel(20)}
          viewBox="0 0 20 20"
        />
      </TouchableOpacity>
    )
  }

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerLeft: headerLeft,
      headerStyle: {
        alignItems: 'center',
        fontWeight: '800',
        backgroundColor: Colors.light_blue,
      },
    })
  }, [navigation])

  useEffect(() => {
    if (data?.data) {
      if (data?.data?.currentPage === 1) {
        setCityList(data?.data?.Record)
      } else {
        setCityList(cityList?.concat(data?.data?.Record))
      }
    }
  }, [data])

  const onEndReached = () => {
    if (
      !isLoading &&
      !isFetching &&
      cityState?.metaData?.currentPage &&
      cityState?.metaData?.currentPage < cityState?.metaData?.totalPages
    ) {
      setPage(cityState?.metaData?.currentPage + 1)
    }
  }

  const navigateToWeather = (item: Record) => {
    navigate(Routes.Weather_Index, { item: item })
  }

  const renderItems = (props: { item: Record; index: number }) => {
    const { item, index } = props

    return (
      <TouchableOpacity
        onPress={() => navigateToWeather(item)}
        activeOpacity={0.8}
        style={[Gutters.smallVPadding, Gutters.smallHPadding]}
      >
        <Text style={[Fonts.textBold, Fonts.textSmall]}>{item?.name}</Text>
        <Text style={[Fonts.textMedium, Fonts.textTiny]}>{item?.country}</Text>
      </TouchableOpacity>
    )
  }

  const renderItemSeperator = () => {
    return <View style={[Style.itemSeperator]} />
  }

  return (
    <SafeAreaView style={[Layout.fill]}>
      <View
        style={[
          Layout.fill,
          Gutters.smallHPadding,
          Gutters.regularVPadding,
          Style.container,
        ]}
      >
        <TextField
          placeholder="Search"
          onChangeText={text => {
            setSearchText(text)
            setPage(1)
          }}
          value={searchText}
        />
        <FlatList
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
          style={[Gutters.regularTMargin]}
          data={cityList}
          renderItem={renderItems}
          ItemSeparatorComponent={renderItemSeperator}
        />
        {/* <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
        <Text style={Fonts.textCenter}>{t('welcome')}</Text> */}
      </View>
    </SafeAreaView>
  )
}

export default StartupContainer
