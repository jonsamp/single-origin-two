import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BottomTabBar } from 'react-navigation-tabs';
import withTheme from 'providers/theme';

class TabBar extends Component {
  static propTypes = {
    props: PropTypes.any,
    theme: PropTypes.object,
    isDarkTheme: PropTypes.bool,
  };

  render() {
    const { theme, isDarkTheme } = this.props;

    return (
      <BottomTabBar
        {...this.props}
        style={{
          backgroundColor: isDarkTheme ? theme.grey2 : theme.grey1,
          borderTopWidth: 1,
          borderTopColor: isDarkTheme ? theme.grey1 : theme.grey2,
        }}
      />
    );
  }
}

export default withTheme(TabBar);
