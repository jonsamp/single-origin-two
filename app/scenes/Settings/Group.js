import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import withTheme from 'providers/theme';
import type from 'constants/type';

class Group extends Component {
  static propTypes = {
    title: PropTypes.string,
    theme: PropTypes.object,
    navigation: PropTypes.object,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const { title, navigation, theme } = this.props;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: theme.background,
          borderBottomColor: theme.grey2,
          borderBottomWidth: 1,
        }}
        onPress={() => navigation.navigate('SettingsDetail', title)}
      >
        <Text style={[type.headline, { color: theme.foreground }]}>
          {title}
        </Text>
        <Feather
          name="chevron-right"
          size={theme.iconSize}
          color={theme.grey3}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(withTheme(Group));
