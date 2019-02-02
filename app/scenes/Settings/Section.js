import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';
import styles from './styles';

class Section extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    theme: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const { title, description, theme, children } = this.props;

    return (
      <View>
        <View
          style={{
            marginTop: 24,
            borderBottomWidth: description ? 0 : 1,
            borderBottomColor: theme.grey2,
            paddingBottom: 8,
          }}
        >
          <Text
            style={[
              type.label,
              {
                color: theme.foreground,
                opacity: 0.9,
                paddingLeft: 16,
              },
            ]}
          >
            {title.toUpperCase()}
          </Text>
        </View>
        {description ? (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              paddingTop: 0,
              marginTop: -4,
              borderBottomWidth: 1,
              borderBottomColor: theme.grey2,
            }}
          >
            <Text
              style={[
                styles.description,
                { color: theme.foreground, opacity: 0.9 },
              ]}
            >
              {description}
            </Text>
          </View>
        ) : null}
        <View style={{ backgroundColor: theme.background }}>{children}</View>
      </View>
    );
  }
}

export default withTheme(Section);
