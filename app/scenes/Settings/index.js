import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from 'providers/theme';
import HeaderScrollView from 'react-native-header-scroll-view';
import { TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Section from './Section';
import Group from './Group';
import SettingWrapper from './SettingWrapper';

class Settings extends Component {
  static propTypes = {
    theme: PropTypes.object,
  };

  render() {
    const { theme } = this.props;
    return (
      <HeaderScrollView
        title="Settings"
        containerStyle={{ backgroundColor: theme.grey1 }}
        headerComponentContainerStyle={{
          backgroundColor: theme.grey1,
          borderBottomWidth: 1,
          borderBottomColor: theme.grey2,
        }}
        headerComponentStyle={{
          backgroundColor: theme.grey1,
        }}
        headlineStyle={{ color: theme.foreground }}
        titleStyle={{
          color: theme.foreground,
          marginBottom: 0,
        }}
        scrollContainerStyle={{
          backgroundColor: theme.grey1,
          paddingBottom: 32,
        }}
        fadeDirection="up"
      >
        <Section title="Brewing">
          <Group title="Recipe settings" />
          <Group title="Grinder" />
          <Group title="Units" />
          <Group title="Menu" />
        </Section>
        <Section title="General">
          <Group title="App" />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'mailto:sampjon@gmail.com?subject=Single%20Origin%20Feedback'
              )
            }
          >
            <SettingWrapper title="Send feedback">
              <Feather name="mail" size={22} color={theme.grey3} />
            </SettingWrapper>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://itunes.apple.com/us/app/appName/id1316843624?mt=8&action=write-review'
              )
            }
          >
            <SettingWrapper title="Rate Single Origin">
              <Feather name="star" size={22} color={theme.grey3} />
            </SettingWrapper>
          </TouchableOpacity>
          <Group title="Privacy policy" />
          <TouchableOpacity
            onPress={() => Linking.openURL('http://mbox.coffee/OGCC')}
          >
            <SettingWrapper title="$10 off Mistobox">
              <Feather name="external-link" size={22} color={theme.grey3} />
            </SettingWrapper>
          </TouchableOpacity>
        </Section>
      </HeaderScrollView>
    );
  }
}

export default withTheme(Settings);
