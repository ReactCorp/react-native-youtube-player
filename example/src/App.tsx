import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import YouTubePlayer, { TopBarPlayerStatus } from 'react-native-youtube-player'

export default function App() {
  const [_, setFullScreen] = React.useState<Boolean>(false)

  const topBarGen = React.useCallback((props: TopBarPlayerStatus) => {
    return <TopBar {...props} />
  }, [])

  const onFullScreen = React.useCallback((fullScreen: Boolean) => {
    console.log('fullscreen ', fullScreen)
    setFullScreen(fullScreen)
  }, [])

  return (
    <View style={styles.container}>
      <YouTubePlayer
        topBar={topBarGen}
        videoId="aqz-KE-bpKQ"
        autoPlay
        onFullScreen={onFullScreen}
        onStart={() => console.log('onStart')}
        onEnd={() => Alert.alert('on End')}
      />

      <View>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          aspernatur rerum, deserunt cumque ipsam unde nam voluptatum tenetur
          cupiditate veritatis autem quidem ad repudiandae sapiente odit
          voluptates fugit placeat ut!
        </Text>
      </View>
    </View>
  )
}

const TopBar = ({ fullScreen, play }: TopBarPlayerStatus) => (
  <View
    style={{
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    }}
  >
    {!fullScreen && (
      <Text style={{ color: '#FFF' }}>
        {' '}
        Custom Top bar{play ? ' (play)' : ' (pause)'}
      </Text>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
