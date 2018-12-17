import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation, Text, View } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';

class Warning extends Component {
  static propTypes = {
    theme: PropTypes.object,
    defaultTheme: PropTypes.object,
    text: PropTypes.string,
    isVisible: PropTypes.bool,
  };

  componentDidUpdate() {
    const config = LayoutAnimation.create(
      350,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.opacity
    );

    LayoutAnimation.configureNext(config);
  }

  render() {
    const { text, theme, defaultTheme, isVisible } = this.props;

    return (
      <View
        style={{
          backgroundColor: theme.warning,
        }}
      >
        {isVisible && (
          <Text
            style={{
              ...type.body,
              color: defaultTheme.black,
              padding: 20,
            }}
          >
            {text}
          </Text>
        )}
      </View>
    );
  }
}

export default withTheme(Warning);
