import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import grinders from 'constants/grinders';
import { weightUnits, tempUnits } from 'constants/units';
import recipes from 'constants/recipes';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import Header from 'components/Header';
import Section from './Section';
import SwitchSetting from './SwitchSetting';
import InputSetting from './InputSetting';
import ChecklistSetting from './ChecklistSetting';
import PrivacyPolicy from './PrivacyPolicy';

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
    settings: PropTypes.object,
    settingUpdated: PropTypes.func,
    navigation: PropTypes.object,
    isDarkTheme: PropTypes.bool,
    toggleTheme: PropTypes.func,
  };

  createChecklistItems = ({ list, settingName }) =>
    Object.values(list).map(item => ({
      ...item,
      value: item.id === this.props.settings[settingName],
    }));

  createRecipesCheckList = () =>
    Object.values(recipes).map(recipe => ({
      ...recipe,
      value: this.props.settings.recipes[recipe.id],
    }));

  recipeUpdated = ({ recipe }) =>
    this.props.settingUpdated({
      setting: 'recipes',
      value: {
        ...this.props.settings.recipes,
        [recipe]: !this.props.settings.recipes[recipe],
      },
    });

  render() {
    const {
      theme,
      settings,
      settingUpdated,
      isDarkTheme,
      toggleTheme,
    } = this.props;
    const groupName = this.props.navigation.state.params;
    let children;

    switch (groupName.toLowerCase().replace(' ', '-')) {
      case 'recipe-settings':
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
                value={settings.grinder}
                onChange={value =>
                  settingUpdated({ setting: 'grinder', value })
                }
                borderTop
              />
              <SwitchSetting
                title="Record temperature"
                description="Record temperature and grind setting while brewing."
                value={settings.waterTemp}
                onChange={value =>
                  settingUpdated({ setting: 'waterTemp', value })
                }
              />
            </Section>
            <Section title="General">
              <SwitchSetting
                title="Expert Mode"
                description="Displays only calculations and timers within recipes."
                value={settings.expertMode}
                onChange={value =>
                  settingUpdated({ setting: 'expertMode', value })
                }
              />
              <SwitchSetting
                title="Restore last brew"
                description="Automatically inserts grind setting and water temp from your most previous brew."
                value={settings.restoreLastBrew}
                onChange={value =>
                  settingUpdated({ setting: 'restoreLastBrew', value })
                }
                borderTop
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
        );
        break;
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
        );
        break;
      case 'units':
        children = (
          <Fragment>
            <Section title="Temperature Units">
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: tempUnits,
                  settingName: 'tempUnit',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'tempUnit', value })
                }
              />
            </Section>
            <Section title="Weight Units">
              <ChecklistSetting
                items={this.createChecklistItems({
                  list: weightUnits,
                  settingName: 'weightUnit',
                })}
                onChange={value =>
                  settingUpdated({ setting: 'weightUnit', value })
                }
              />
            </Section>
          </Fragment>
        );
        break;
      case 'menu':
        children = (
          <Fragment>
            <Section title="Menu Recipes">
              <ChecklistSetting
                items={this.createRecipesCheckList()}
                onChange={recipe => this.recipeUpdated({ recipe })}
              />
            </Section>
          </Fragment>
        );
        break;
      case 'app':
        children = (
          <Fragment>
            <Section>
              <SwitchSetting
                title="Dark Mode"
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
                title="Share Anonymous Data"
                description="Single Origin anonymously collects usage analytics of the app. This helps us develop new features and improve the overall user experience. If you prefer not to share your data, tap the toggle button to opt-out."
                value={settings.shareTrackingData}
                onChange={value =>
                  settingUpdated({ setting: 'shareTrackingData', value })
                }
              />
            </Section>
          </Fragment>
        );
        break;
      case 'privacy-policy':
        children = (
          <Fragment>
            <Section>
              <PrivacyPolicy />
            </Section>
          </Fragment>
        );
        break;
      default:
        children = null;
    }

    return (
      <View style={{ backgroundColor: theme.grey1, flex: 1 }}>
        <Header title={groupName} />
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(withSettings(Settings));
