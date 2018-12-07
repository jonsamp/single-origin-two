import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';

class Section extends Component {
  static propTypes = {
    title: PropTypes.string,
    theme: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const { title, theme, children } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 24,
            borderBottomWidth: 1,
            borderBottomColor: theme.grey2,
            paddingBottom: 8,
          }}
        >
          <Text
            style={[
              type.label,
              {
                color: theme.foreground,
                opacity: 0.75,
                paddingLeft: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.grey2,
              },
            ]}
          >
            {title.toUpperCase()}
          </Text>
        </View>
        <View style={{ backgroundColor: theme.background }}>{children}</View>
      </View>
    );
  }
}

export default withTheme(Section);
