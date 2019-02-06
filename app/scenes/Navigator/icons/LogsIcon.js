import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'expo';
import { connect } from 'react-redux';
import { selectSettings } from 'state/settings/selectors';
import themes from 'constants/themes';

const mapStateToProps = state => ({
  theme: selectSettings(state).theme,
});

const propTypes = {
  focused: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
};

const LogsIcon = ({ focused, theme }) => (
  <Svg width="28" height="24">
    <Svg.G
      fill={focused ? themes[theme].primary : themes[theme].foreground}
      fillRule="nonzero"
    >
      <Svg.Path d="M10.584 8.71a1 1 0 1 1 0-2h7.244a1 1 0 0 1 0 2h-7.244zM6.453 18.73a1 1 0 0 1 0-2h15.016a1 1 0 1 1 0 2H6.453zM6.61 14.897a1 1 0 1 1 0-2h14.885a1 1 0 1 1 0 2H6.61z" />
      <Svg.Path d="M4.552 2.816a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h19a2 2 0 0 0 2-2v-15a2 2 0 0 0-2-2h-19zm0-2h19a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4h-19a4 4 0 0 1-4-4v-15a4 4 0 0 1 4-4z" />
    </Svg.G>
  </Svg>
);

LogsIcon.propTypes = propTypes;

export default connect(mapStateToProps)(LogsIcon);
