import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { HeaderBackButton } from '@react-navigation/stack'
import Log from '../../components/Log'
import { width, isMaxWidth, height } from '../../constants/layout'
import withTheme, { Styleguide, Theme } from '../../providers/theme'
import { selectLog } from '../../state/logs/selectors'
import styles from './styles'

interface BrewSummaryProps {
  navigation: any
  styleguide: Styleguide
  route: any
  theme: Theme
}

const mapStateToProps = (state, props) => {
  const { timestamp } = props.route.params
  return {
    log: selectLog(state, timestamp),
  }
}

function BrewSummary(props: BrewSummaryProps) {
  const { navigation, route, styleguide, theme } = props
  const insets = useSafeAreaInsets()
  const onBack = () => navigation.popToTop()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={onBack}
          labelVisible={false}
          tintColor={theme.foreground}
          style={{
            left: -16,
          }}
        />
      ),
    })
  }, [navigation])

  return (
    <View style={{ flex: 1 }}>
      <Log
        timestamp={route.params.timestamp}
        withReminder
        style={{ paddingBottom: 120 }}
      />
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <View
          style={[
            styles.buttonContainer,
            isMaxWidth && {
              width: styleguide.maxWidth,
            },
          ]}
        >
          <Button
            title="done"
            type="tertiary"
            customStyle={[
              {
                ...(isMaxWidth
                  ? {
                      marginBottom: insets.bottom + 16,
                    }
                  : {
                      paddingBottom: insets.bottom + height,
                      marginHorizontal: -16,
                      marginBottom: -height,
                    }),
              },
            ]}
            onPress={onBack}
          />
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps)(withTheme(BrewSummary))
