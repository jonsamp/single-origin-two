import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

import Button from '../../../components/Button'
import { isMaxWidth, height } from '../../../constants/layout'
import withSettings from '../../../providers/settings'
import withTheme, { Styleguide } from '../../../providers/theme'
import { logAdded } from '../../../state/logs/actions'
import { selectRecentLog } from '../../../state/logs/selectors'
import { Log } from '../../../state/logs/types'
import { Settings } from '../../../state/settings/types'
import { Recipe as RecipeType } from '../../../types'
import { UnitHelpers } from '../../../types/index'
import AddIce from './AddIce'
import BoilWater from './BoilWater'
import GrindCoffee from './GrindCoffee'
import IceToggle from './IceToggle'
import Notes from './Notes'
import PourTimer from './PourTimer'
import Preparation from './Preparation'
import RecordBrewAttributes from './RecordBrewAttributes'
import YieldQuestion from './YieldQuestion'

interface RecipeProps {
  settings: Settings
  unitHelpers: UnitHelpers
  recipe: RecipeType
  logAdded: (props: any) => void
  recentLog: Log
  styleguide: Styleguide
  navigation: any
  insets: {
    bottom: number
  }
}

interface RecipeState {
  grind: number
  temp: number
  timestamp: number
  totalBrewTime: number
  attributesRecorded: boolean
  totalVolume: number
  randomKey: number
  isIced: boolean
}

const mapStateToProps = (state, props) => ({
  recentLog: selectRecentLog(state, props.recipe.id),
})

const mapDispatchToProps = { logAdded }

class Recipe extends Component<RecipeProps, RecipeState> {
  static defaultProps = {
    settings: {},
    unitHelpers: {},
    navigation: {},
  }

  state = {
    randomKey: 1,
    grind: this.props.recentLog.grind,
    temp: this.props.recentLog.temp || 205,
    timestamp: new Date().getTime(),
    totalBrewTime: 0,
    attributesRecorded: false,
    totalVolume:
      this.props.recentLog.totalVolume || this.props.recipe.defaultTotalVolume,
    isIced: false,
  }

  componentDidMount() {
    activateKeepAwake()
  }

  componentWillUnmount() {
    deactivateKeepAwake()
  }

  setRecipeState = ({ key, value }) => this.setState({ [key]: value } as any)

  onIsIcedChange = (value) => this.setState({ isIced: value })

  onFinish = () => {
    const { navigation, recipe, settings, logAdded } = this.props
    const {
      timestamp,
      totalVolume,
      grind,
      temp,
      totalBrewTime,
      attributesRecorded,
    } = this.state
    const log = {
      timestamp,
      totalVolume,
      totalBrewTime,
      ratio: settings.ratio,
      ...(attributesRecorded && settings.recordGrind
        ? {
            grind:
              grind ||
              this.props.unitHelpers.grindUnit.getPreferredValueBasedOnPercent(
                this.props.recipe.defaultGrind
              ),
          }
        : null),
      ...(attributesRecorded && settings.recordTemp
        ? {
            temp,
          }
        : null),
      recipeId: recipe.id,
    }

    logAdded({ log })
    this.setState({ randomKey: Math.random() }, () => {
      navigation.navigate('BrewSummary', { timestamp })
    })
  }

  render() {
    const { recipe, settings, unitHelpers, recentLog, styleguide } = this.props
    const { grindUnit, temperatureUnit } = unitHelpers
    const { minYield, maxYield, defaultGrind } = recipe
    const { totalVolume, grind, temp } = this.state
    const coffeeWeight = Math.round(totalVolume / settings.ratio)
    const totalPourVolume = this.state.isIced
      ? Math.round(totalVolume * 0.666)
      : totalVolume
    const longestSecond = recipe.steps
      .filter((s) => s.second)
      .map((s) => s.second)
      .sort((a, b) => b - a)[0]

    return (
      <View style={isMaxWidth && { alignItems: 'center' }}>
        <View style={isMaxWidth && { width: styleguide.maxWidth }}>
          <Preparation
            recipe={recipe.title.toLowerCase()}
            preparation={recipe.preparation}
            navigation={this.props.navigation}
          />
          <YieldQuestion
            defaultValue={recentLog.totalVolume || recipe.defaultTotalVolume}
            setRecipeState={this.setRecipeState}
            minYield={minYield}
            maxYield={maxYield}
          />
          {recipe.iced && (
            <IceToggle
              value={this.state.isIced}
              onChange={this.onIsIcedChange}
            />
          )}
          {recentLog.notes ? <Notes text={recentLog.notes} /> : null}
          <BoilWater volume={totalPourVolume} />
          <GrindCoffee
            coffeeWeight={coffeeWeight}
            defaultGrind={defaultGrind}
            title={recipe.title}
            recentLog={recentLog}
            recipeDuration={longestSecond + settings.bloomDuration}
          />
          {this.state.isIced && (
            <AddIce volume={Math.round(totalVolume * 0.333)} />
          )}
          <RecordBrewAttributes
            setRecipeState={this.setRecipeState}
            defaultGrind={defaultGrind}
            grind={grind}
            temp={temp}
            grindUnit={grindUnit}
            temperatureUnit={temperatureUnit}
          />
          <PourTimer
            recipe={recipe}
            volume={totalPourVolume}
            setRecipeState={this.setRecipeState}
            key={this.state.randomKey + settings.bloomDuration}
          />
          <Button
            title="Finish Brew"
            customStyle={{
              ...(isMaxWidth
                ? {
                    marginBottom: this.props.insets.bottom + 16,
                  }
                : {
                    paddingBottom: this.props.insets.bottom + height + 4,
                    marginHorizontal: -16,
                    marginBottom: -height,
                  }),
            }}
            onPress={this.onFinish}
            type="tertiary"
          />
        </View>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSafeAreaInsets(withSettings(withTheme(Recipe))))
