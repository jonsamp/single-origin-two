import React, { Component, Fragment } from 'react'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import withSettings from '../../../providers/settings'
import { logAdded } from '../../../state/logs/actions'
import { Settings } from '../../../state/settings/types'
import { State } from '../../../state/types'
import { UnitHelpers } from '../../../types/index'
import KalitaWave185 from '../recipes/KalitaWave185'
import BoilWater from './BoilWater'
import GrindCoffee from './GrindCoffee'
import PourTimer from './PourTimer'
import Preparation from './Preparation'
import RecordBrewAttributes from './RecordBrewAttributes'
import YieldQuestion from './YieldQuestion'

interface RecipeProps {
  settings: Settings
  unitHelpers: UnitHelpers
  recipe: any // TODO: fix this type
  navigation: NavigationScreenProp<State, any>
  logAdded: (props: any) => void
}

interface RecipeState {
  grind: number
  temp: number
  timestamp: number
  totalBrewTime: number
  attributesRecorded: boolean
  totalVolume: number
}

const mapDispatchToProps = { logAdded }

class Recipe extends Component<RecipeProps, RecipeState> {
  static defaultProps = {
    settings: {},
    unitHelpers: {},
    navigation: {},
  }

  state = {
    grind: undefined,
    temp: 205,
    timestamp: new Date().getTime(),
    totalBrewTime: 0,
    attributesRecorded: false,
    totalVolume: undefined,
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

    navigation.navigate('BrewSummary', { timestamp })
  }

  render() {
    const { recipe, settings, unitHelpers } = this.props
    const { grindUnit, temperatureUnit } = unitHelpers
    const { minYield, maxYield, defaultGrind } = recipe
    const { totalVolume, grind, temp } = this.state
    const coffeeWeight = Math.round(totalVolume / settings.ratio)

    console.log(recipe.preparation)

    return (
      <Fragment>
        <Preparation
          recipe={recipe.title.toLowerCase()}
          preparation={recipe.preparation}
        />
        <YieldQuestion
          totalVolume={350}
          setRecipeState={this.setRecipeState}
          minYield={minYield}
          maxYield={maxYield}
        />
        <BoilWater totalVolume={totalVolume} />
        <GrindCoffee
          coffeeWeight={coffeeWeight}
          defaultGrind={defaultGrind}
          title={recipe.title}
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
          recipe={KalitaWave185}
          volume={totalVolume}
          setRecipeState={this.setRecipeState}
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
  null,
  mapDispatchToProps
)(withSettings(withNavigation(Recipe as any)))
