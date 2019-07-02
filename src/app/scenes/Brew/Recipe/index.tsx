import React, { Component, Fragment } from 'react'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import withSettings from '../../../providers/settings'
import { logAdded } from '../../../state/logs/actions'
import { selectRecentLog } from '../../../state/logs/selectors'
import { Log } from '../../../state/logs/types'
import { Settings } from '../../../state/settings/types'
import { State } from '../../../state/types'
import { Recipe as RecipeType } from '../../../types'
import { UnitHelpers } from '../../../types/index'
import AddIce from './AddIce'
import BoilWater from './BoilWater'
import GrindCoffee from './GrindCoffee'
import Notes from './Notes'
import PourTimer from './PourTimer'
import Preparation from './Preparation'
import RecordBrewAttributes from './RecordBrewAttributes'
import YieldQuestion from './YieldQuestion'

interface RecipeProps {
  settings: Settings
  unitHelpers: UnitHelpers
  recipe: RecipeType
  navigation: NavigationScreenProp<State, any>
  logAdded: (props: any) => void
  recentLog: Log
}

interface RecipeState {
  grind: number
  temp: number
  timestamp: number
  totalBrewTime: number
  attributesRecorded: boolean
  totalVolume: number
  randomKey: number
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
  }

  setRecipeState = ({ key, value }) => this.setState({ [key]: value } as any)

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
    const { recipe, settings, unitHelpers, recentLog } = this.props
    const { grindUnit, temperatureUnit } = unitHelpers
    const { minYield, maxYield, defaultGrind } = recipe
    const { totalVolume, grind, temp } = this.state
    const coffeeWeight = Math.round(totalVolume / settings.ratio)
    const totalPourVolume = recipe.iced
      ? Math.round(totalVolume * 0.666)
      : totalVolume
    const longestSecond = recipe.steps
      .filter(s => s.second)
      .map(s => s.second)
      .sort((a, b) => b - a)[0]

    return (
      <Fragment>
        <Preparation
          recipe={recipe.title.toLowerCase()}
          preparation={recipe.preparation}
        />
        <YieldQuestion
          defaultValue={recentLog.totalVolume || recipe.defaultTotalVolume}
          setRecipeState={this.setRecipeState}
          minYield={minYield}
          maxYield={maxYield}
        />
        {recentLog.notes ? <Notes text={recentLog.notes} /> : null}
        <BoilWater volume={totalPourVolume} />
        {recipe.iced && <AddIce volume={Math.round(totalVolume * 0.333)} />}
        <GrindCoffee
          coffeeWeight={coffeeWeight}
          defaultGrind={defaultGrind}
          title={recipe.title}
          recentLog={recentLog}
          recipeDuration={longestSecond + settings.bloomDuration}
        />
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
          key={this.state.randomKey}
        />
        <Button
          title="Finish"
          customStyle={{ marginVertical: 16, paddingVertical: 20 }}
          onPress={this.onFinish}
        />
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSettings(withNavigation(Recipe as any)))
