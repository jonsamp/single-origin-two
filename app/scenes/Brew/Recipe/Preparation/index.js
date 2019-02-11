import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import withTheme from 'providers/theme';
import Card from 'components/Card';
import Instructions from 'components/Instructions';

const propTypes = {
  theme: PropTypes.object,
  navigation: PropTypes.object,
  recipe: PropTypes.string,
};

function Preparation({ theme, navigation, recipe }) {
  return (
    <TouchableOpacity onPress={() => console.log(recipe)} activeOpacity={0.7}>
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
          }}
        >
          <Instructions text={`Prepare your ${recipe}`} icon="TipIcon" />
          <Feather
            name="chevron-right"
            size={theme.iconSize}
            color={theme.foreground}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

Preparation.propTypes = propTypes;

export default withNavigation(withTheme(Preparation));
