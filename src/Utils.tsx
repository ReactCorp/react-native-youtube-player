import { Dimensions, Platform } from 'react-native'
import Animated, { Extrapolate } from 'react-native-reanimated'

const { width: _width, height: _height } = Dimensions.get('window')
const innerHeight = _width < _height ? _height : _width
const innerWidth = _width < _height ? _width : _height

const IsAndroid = Platform.OS === 'android'

export const VideoSize = {
  inline: {
    width: innerWidth,
    height: (innerWidth * 9) / 16,
  },
  fullScreen: {
    height: innerWidth,
    width: innerHeight,
  },
}

export const fullScreenInterpolate = (
  width: Animated.Value<number>,
  layout: { top: number; left: number }
) => {
  const inputRange = [VideoSize.inline.width, VideoSize.fullScreen.width]

  const topRange = [IsAndroid ? layout.top : 0, IsAndroid ? 0 : -layout.top]
  const leftRange = [IsAndroid ? layout.left : 0, IsAndroid ? 0 : -layout.left]

  const top = width.interpolate({
    inputRange,
    outputRange: topRange,
    extrapolate: Extrapolate.CLAMP,
  })
  const left = width.interpolate({
    inputRange,
    outputRange: leftRange,
    extrapolate: Extrapolate.CLAMP,
  })
  const height = width.interpolate({
    inputRange,
    outputRange: [VideoSize.inline.height, VideoSize.fullScreen.height + 2],
    extrapolate: Extrapolate.CLAMP,
  })

  return { top, height, left }
}

export const sec2time = (time: number) => {
  var pad = function (num: number, size: number) {
      return ('000' + num).slice(size * -1)
    },
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60)

  return `${hours > 0 ? pad(hours, 2) + ':' : ''} ${pad(minutes, 2)} :${pad(
    seconds,
    2
  )}`
}
