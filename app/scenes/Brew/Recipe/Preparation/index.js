import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import withTheme from 'providers/theme';
import Card from 'components/Card';
import type from 'constants/type';

const propTypes = {
  theme: PropTypes.object,
  navigation: PropTypes.object,
  recipe: PropTypes.string,
};

function Preparation({ theme, navigation, recipe }) {
  return (
    <Card>
      <TouchableOpacity
        onPress={() => console.log(recipe)}
        activeOpacity={0.7}
        style={{
          backgroundColor: theme.grey1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            ...type.body,
            color: theme.foreground,
          }}
        >
          Prepare your {recipe}
        </Text>
        <Feather
          name="chevron-right"
          size={theme.iconSize}
          color={theme.foreground}
        />
      </TouchableOpacity>
    </Card>
  );
}

Preparation.propTypes = propTypes;

export default withNavigation(withTheme(Preparation));
