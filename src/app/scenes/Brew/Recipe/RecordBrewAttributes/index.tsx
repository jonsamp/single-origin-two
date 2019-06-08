import { Feather } from '@expo/vector-icons'
import { Haptic } from 'expo'
import React, { Component } from 'react'
import { Animated, LayoutAnimation, TouchableOpacity, View } from 'react-native'
import Card from '../../../../components/Card'
import DraggableSegment from '../../../../components/DraggableSegment'
import Instructions from '../../../../components/Instructions'
import ScrollSelect from '../../../../components/ScrollSelect'
import withSettings from '../../../../providers/settings'
import withTheme from '../../../../providers/theme'
import { Settings } from '../../../../state/settings/types'
import { GrindHelper, Theme, Unit } from '../../../../types/index'

interface RecordBrewAttributesProps {
  theme: Theme
  settings: Settings
  grind: number
  defaultGrind: number
  temp: number
  setRecipeState: (props: { key: string; value: any }) => void
  temperatureUnit: { unit: Unit }
  grindUnit: GrindHelper
  isDarkTheme: boolean
}

interface RecordBrewAttributesState {
  recordSegmentIndex: number
  isOpen: boolean
}

class RecordBrewAttributes extends Component<
  RecordBrewAttributesProps,
  RecordBrewAttributesState
> {
  state = {
    recordSegmentIndex: 0,
    isOpen: false,
  }

  animatedOpacityValue = new Animated.Value(1)
  animatedRotationValue = new Animated.Value(0)

  onStartMove = () => {
    Animated.timing(this.animatedOpacityValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  onStopMove = () => {
    Animated.timing(this.animatedOpacityValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  toggleIsOpen = () => {
    const config = LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.opacity
    )

    LayoutAnimation.configureNext(config)

    Haptic.selection()

    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => {
        if (this.state.isOpen) {
          this.props.setRecipeState({ key: 'attributesRecorded', value: true })
        }

        Animated.spring(this.animatedRotationValue, {
          toValue: this.state.isOpen ? 1 : 0,
          useNativeDriver: true,
        }).start()
      }
    )
  }

  render() {
    const {
      settings,
      theme,
      temperatureUnit,
      grindUnit,
      isDarkTheme,
    } = this.props
    const { recordSegmentIndex } = this.state

    if (!settings.recordGrind && !settings.recordTemp) {
      return null
    }

    const recordSettings = []
    let instructions
    if (settings.recordGrind) {
      recordSettings.push('grind')
      instructions = 'Record your grind setting.'
    }
    if (settings.recordTemp) {
      recordSettings.push('temperature')
      instructions = 'Record your water temperature.'
    }

    if (settings.recordTemp && settings.recordGrind) {
      instructions = 'Record your grind setting and water temperature.'
    }

    const recordGrindComponent = (
      <ScrollSelect
        unitType="grindUnit"
        min={grindUnit.grinder.min}
        max={grindUnit.grinder.max}
        defaultValue={
          this.props.grind ||
          grindUnit.getPreferredValueBasedOnPercent(this.props.defaultGrind)
        }
        label="grind"
        onChange={value =>
          this.props.setRecipeState({
            key: 'grind',
            value,
          })
        }
        step={1}
      />
    )

    const recordTempComponent = (
      <ScrollSelect
        unitType="temperatureUnit"
        min={160}
        max={212}
        defaultValue={this.props.temp}
        label={temperatureUnit.unit.symbol}
        onChange={value =>
          this.props.setRecipeState({
            key: 'temp',
            value,
          })
        }
        step={1}
      />
    )

    return (
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Instructions text={instructions} icon="RecordIcon" />
          <TouchableOpacity
            onPress={this.toggleIsOpen}
            style={{
              padding: 8,
              shadowColor: 'rgba(0,0,0,0.2)',
              shadowRadius: 4,
              shadowOffset: { height: 2, width: 0 },
              shadowOpacity: 1,
              backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
              borderRadius: 4,
              marginRight: 20,
            }}
            activeOpacity={1}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: this.animatedRotationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-180deg'],
                    }),
                  },
                ],
              }}
            >
              <Feather
                name="chevron-down"
                size={theme.iconSize}
                color={theme.foreground}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        {this.state.isOpen ? (
          <View>
            {recordSettings.length > 1 && (
              <View style={{ backgroundColor: theme.grey2 }}>
                <DraggableSegment
                  options={recordSettings}
                  onChange={index =>
                    setTimeout(() => {
                      this.setState({ recordSegmentIndex: index })
                    }, 300)
                  }
                  onStartMove={this.onStartMove}
                  onStopMove={this.onStopMove}
                />
                <Animated.View
                  style={{
                    opacity: this.animatedOpacityValue,
                  }}
                >
                  {recordSegmentIndex === 0 ? recordGrindComponent : null}
                  {recordSegmentIndex === 1 ? recordTempComponent : null}
                </Animated.View>
              </View>
            )}
            {recordSettings.length === 1
              ? recordSettings.includes('grind')
                ? recordGrindComponent
                : recordTempComponent
              : null}
          </View>
        ) : null}
      </Card>
    )
  }
}

export default withTheme(withSettings(RecordBrewAttributes))
