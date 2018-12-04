import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { selectSettings } from 'state/settings/selectors';
import themes from 'constants/themes';

const mapStateToProps = state => ({
  theme: selectSettings(state).theme,
});

class TabBar extends Component {
  static propTypes = {
    props: PropTypes.any,
    theme: PropTypes.string.isRequired,
  };

  static defaultProps = {
    props: {},
  };

  render() {
    const theme = themes[this.props.theme];

    return (
      <BottomTabBar
        {...this.props}
        style={{
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderTopColor: theme.grey2,
        }}
      />
    );
  }
}

export default connect(mapStateToProps)(TabBar);
