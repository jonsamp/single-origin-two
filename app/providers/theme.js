import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import themes from 'constants/themes';
import { themeUpdated } from 'state/settings/actions';
import { selectSettings } from 'state/settings/selectors';

const mapStateToProps = state => ({ theme: selectSettings(state).theme });

const mapDispatchToProps = {
  themeUpdated,
};

function withTheme(WrappedComponent) {
  class Wrapper extends Component {
    static propTypes = {
      theme: PropTypes.string,
      themeUpdated: PropTypes.func,
    };

    toggleTheme = () => {
      const { theme, themeUpdated } = this.props;
      themeUpdated({ theme: theme === 'dark' ? 'light' : 'dark' });
    };

    render() {
      const { theme } = this.props;
      const statusBarTheme = theme === 'dark' ? 'light' : 'dark';
      StatusBar.setBarStyle(`${statusBarTheme}-content`);
      return (
        <WrappedComponent
          theme={themes[this.props.theme]}
          toggleTheme={this.toggleTheme}
          isDarkTheme={this.props.theme === 'dark'}
          isLightTheme={this.props.theme === 'light'}
        />
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper);
}

export default withTheme;
