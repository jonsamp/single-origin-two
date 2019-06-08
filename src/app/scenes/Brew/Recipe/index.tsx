import React, { Component, Fragment } from 'react'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import withSettings from '../../../providers/settings'
import { handleTick } from '../../../scenes/Brew/helpers'
import recipes from '../../../scenes/Brew/recipes'
import { logAdded } from '../../../state/logs/actions'
import { Settings } from '../../../state/settings/types'
import { State } from '../../../state/types'
import {
  PourEvents,
  RecipeConfig,
  Tip,
  UnitHelpers,
} from '../../../types/index'
import KalitaWave185 from '../recipes/KalitaWave185'
import BoilWater from './BoilWater'
import GrindCoffee from './GrindCoffee'
// import PourTimer from './PourTimer'
import PourTimer from './PourTimerTest'
import Preparation from './Preparation'
import RecordBrewAttributes from './RecordBrewAttributes'
import YieldQuestion from './YieldQuestion'

interface RecipeProps {
  settings: Settings
  unitHelpers: UnitHelpers
  recipe: RecipeConfig
  navigation: NavigationScreenProp<State, any>
  logAdded: (props: any) => void
}

interface RecipeState {
  isLoaded: boolean
  volumePercent: number
  grind: number
  temp: number
  tip: Tip
  warningText: string
  timestamp: number
  totalBrewTime: number
  attributesRecorded: boolean
  totalVolume: number
  defaultGrind: number
  pourEvents: PourEvents
  pourSourceDefault: number
  minYield: number
  maxYield: number
  totalTime: number
  image: any
}

const mapDispatchToProps = { logAdded }

class Recipe extends Component<RecipeProps, RecipeState> {
  static defaultProps = {
    settings: {},
    unitHelpers: {},
    navigation: {},
  }

  state = {
    isLoaded: false,
    volumePercent: 0,
    grind: null,
    temp: 205,
    tip: {
      text: undefined,
    } as Tip,
    warningText: undefined,
    timestamp: new Date().getTime(),
    totalBrewTime: 0,
    attributesRecorded: false,
    totalVolume: undefined,
    defaultGrind: undefined,
    pourEvents: undefined,
    image: recipes[this.props.recipe.id].defaultSource,
  } as RecipeState

  componentDidMount() {
    // const recipe = recipes[this.props.recipe.id]({
    //   settings: this.props.settings,
    // })
    this.setState({
      // ...recipe,
      isLoaded: true,
    })
  }

  // setRecipeState = ({ key, value }) => this.setState({ [key]: value } as any)

  // onTick = (second: number) => {
  //   handleTick({
  //     pourEvents: this.state.pourEvents,
  //     tip: this.state.tip,
  //     totalVolume: this.state.totalVolume,
  //     waterVolumeUnit: this.props.unitHelpers.waterVolumeUnit,
  //     setState: this.setRecipeState,
  //     second,
  //   })
  //   this.setState({ totalBrewTime: second })
  // }

  // onFinish = () => {
  //   const { navigation, recipe, settings, logAdded } = this.props
  //   const {
  //     timestamp,
  //     totalVolume,
  //     grind,
  //     temp,
  //     totalBrewTime,
  //     attributesRecorded,
  //   } = this.state
  //   const log = {
  //     timestamp,
  //     totalVolume,
  //     totalBrewTime,
  //     ratio: settings.ratio,
  //     ...(attributesRecorded && settings.recordGrind
  //       ? {
  //           grind:
  //             grind ||
  //             this.props.unitHelpers.grindUnit.getPreferredValueBasedOnPercent(
  //               this.state.defaultGrind
  //             ),
  //         }
  //       : null),
  //     ...(attributesRecorded && settings.recordTemp
  //       ? {
  //           temp,
  //         }
  //       : null),
  //     recipeId: recipe.id,
  //   }

  //   logAdded({ log })

  //   navigation.navigate('BrewSummary', { timestamp })
  // }

  render() {
    // const { settings, unitHelpers, recipe } = this.props
    const {
      // totalVolume,
      // totalTime,
      // temp,
      // defaultGrind,
      // grind,
      // volumePercent,
      // tip,
      // warningText,
      isLoaded,
      // pourSourceDefault,
      // minYield,
      // maxYield,
      // image,
    } = this.state
    // const { grindUnit, temperatureUnit } = unitHelpers
    // const coffeeWeight = Math.round(totalVolume / settings.ratio)

    if (!isLoaded) {
      return null
    }

    return (
      <Fragment>
        {/* <YieldQuestion
          totalVolume={totalVolume}
          setRecipeState={this.setRecipeState}
          minYield={minYield}
          maxYield={maxYield}
        />
        <Preparation recipe={recipe.title.toLowerCase()} />
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
        /> */}
        <PourTimer recipe={KalitaWave185} />
        {/* // totalWaterWeight={totalVolume}
          // waterPercent={volumePercent}
          // source={image}
          // defaultSource={pourSourceDefault}
          // totalTime={totalTime}
          // totalVolume={totalVolume} */}

        {/* <Button
          title="Finish"
          customStyle={{ marginVertical: 16, paddingVertical: 20 }}
          onPress={this.onFinish}
        /> */}
      </Fragment>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withSettings(withNavigation(Recipe as any)))
