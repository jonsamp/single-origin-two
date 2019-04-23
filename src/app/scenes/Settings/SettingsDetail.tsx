import Header from '@app/components/Header'
import { grinders } from '@app/constants/grinders'
import recipes from '@app/constants/recipes'
import { tempUnits, weightUnits } from '@app/constants/units'
import withSettings from '@app/providers/settings'
import withTheme from '@app/providers/theme'
import { Settings as SettingsType } from '@app/state/settings/types'
import { Theme } from '@app/types/index'
import React, { Component, Fragment } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import ChecklistSetting from './ChecklistSetting'
import InputSetting from './InputSetting'
import PrivacyPolicy from './PrivacyPolicy'
import Section from './Section'
import SwitchSetting from './SwitchSetting'

interface SettingsProps {
  theme: Theme
  settings: SettingsType
  settingUpdated: (props: any) => void
  navigation: NavigationScreenProp<any>
  isDarkTheme: boolean
  toggleTheme: () => void
}

class Settings extends Component<SettingsProps> {
  createChecklistItems = ({ list, settingName }) =>
    Object.values(list).map((item: any) => ({
      ...item,
      value: item.id === this.props.settings[settingName],
    }))

  createRecipesCheckList = () =>
    Object.values(recipes).map(recipe => ({
      ...recipe,
      value: this.props.settings.recipes[recipe.id],
    }))

  recipeUpdated = ({ recipe }) =>
    this.props.settingUpdated({
      setting: 'recipes',
      value: {
        ...this.props.settings.recipes,
        [recipe]: !this.props.settings.recipes[recipe],
      },
    })

  render() {
    const {
      theme,
      settings,
      settingUpdated,
      isDarkTheme,
      toggleTheme,
    } = this.props
    const groupName = this.props.navigation.state.params
    let children

    switch (groupName.toLowerCase().replace(' ', '-')) {
      case 'brew-settings':
        children = (
          <Fragment>
            <Section title="Brewing">
              <InputSetting
                title="Coffee to water ratio"
                description="Grams of water to grams of coffee ratio. Smaller numbers produce stronger coffee. Default: 16."
                value={settings.ratio}
                onChange={value => settingUpdated({ setting: 'ratio', value })}
              />
              <InputSetting
                title="Bloom time"
                description="The number of seconds for the bloom. Default: 45 seconds."
                value={settings.bloomDuration}
                onChange={value =>
                  settingUpdated({ setting: 'bloomDuration', value })
                }
                borderTop
              />
              <SwitchSetting
                title="Record grind setting"
                value={settings.recordGrind}
                onChange={value =>
                  settingUpdated({ setting: 'recordGrind', value })
                }
                borderTop
              />
              <SwitchSetting
                title="Record temperature"
                description="Record temperature and grind setting while brewing."
                value={settings.recordTemp}
                onChange={value =>
                  settingUpdated({ setting: 'recordTemp', value })
                }
              />
            </Section>
            <Section title="General">
              <SwitchSetting
                title="Restore last brew"
                description="Automatically inserts grind setting and water temp from your most previous brew."
                value={settings.restoreLastBrew}
                onChange={value =>
                  settingUpdated({ setting: 'restoreLastBrew', value })
                }
              />
              <SwitchSetting
                title="Tasting reminder"
                description="Receive a notification to taste and rate your brew once your brew has cooled to tasting temperature."
                value={settings.reminders}
                onChange={value =>
                  settingUpdated({ setting: 'reminders', value })
                }
                borderTop
              />
            </Section>
          </Fragment>
        )
        break
      case 'grinder':
        children = (
          <Fragment>
            <Section title="Grinder type">
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: grinders,
                  settingName: 'grinderType',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'grinderType', value })
                }
              />
            </Section>
          </Fragment>
        )
        break
      case 'units':
        children = (
          <Fragment>
            <Section title="Temperature units">
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: tempUnits,
                  settingName: 'temperatureUnit',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'temperatureUnit', value })
                }
              />
            </Section>
            <Section
              title="Brewed coffee volume units"
              description="The units used to set the volume of brewed coffee you’ll make."
            >
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: 'brewedVolumeUnit',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'brewedVolumeUnit', value })
                }
              />
            </Section>
            <Section
              title="Coffee weight units"
              description="The units used to present the weight of coffee beans you’ll need to grind."
            >
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: 'coffeeWeightUnit',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'coffeeWeightUnit', value })
                }
              />
            </Section>
            <Section
              title="Water volume units"
              description="The units used to present the weight of water you’ll need to pour over."
            >
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: 'waterVolumeUnit',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'waterVolumeUnit', value })
                }
              />
            </Section>
          </Fragment>
        )
        break
      case 'recipes':
        children = (
          <Fragment>
            <Section title="Menu Recipes">
              <ChecklistSetting
                items={this.createRecipesCheckList()}
                onChange={recipe => this.recipeUpdated({ recipe })}
              />
            </Section>
          </Fragment>
        )
        break
      case 'app':
        children = (
          <Fragment>
            <Section>
              <SwitchSetting
                title="Dark mode"
                value={isDarkTheme}
                onChange={toggleTheme}
              />
              <SwitchSetting
                title="Sounds enabled"
                value={settings.soundsEnabled}
                onChange={value =>
                  settingUpdated({ setting: 'soundsEnabled', value })
                }
              />
              <SwitchSetting
                title="Share anonymous data"
                description="Single Origin anonymously collects usage analytics of the app. This helps us develop new features and improve the overall user experience. If you prefer not to share your data, tap the toggle button to opt-out."
                value={settings.shareTrackingData}
                onChange={value =>
                  settingUpdated({ setting: 'shareTrackingData', value })
                }
              />
            </Section>
          </Fragment>
        )
        break
      case 'privacy-policy':
        children = (
          <Fragment>
            <Section>
              <PrivacyPolicy />
            </Section>
          </Fragment>
        )
        break
      default:
        children = null
    }

    return (
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
          flex: 1,
        }}
      >
        <Header title={groupName} />
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {children}
        </ScrollView>
      </View>
    )
  }
}

export default withTheme(withSettings(Settings))
