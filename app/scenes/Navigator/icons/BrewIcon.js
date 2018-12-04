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

const BrewIcon = ({ focused, theme }) => (
  <Svg width="24" height="19"><Svg.Path d="M19.92 7.509a3.496 3.496 0 1 1-1.903 6.048c-1.718 3.104-4.457 5.23-7.982 5.23C3.779 18.787.045 11.76 0 5.11c-.046-6.648 20.07-6.98 20.07 0 0 .806-.05 1.609-.15 2.398zm-9.91 1.097c3.352 0 6.07-1.25 6.07-2.791s-2.718-2.79-6.07-2.79c-3.354 0-6.071 1.249-6.071 2.79s2.717 2.79 6.07 2.79zm10.367 3.655a1.286 1.286 0 1 0 0-2.572 1.286 1.286 0 0 0 0 2.572z" fill={focused ? themes[theme].primary : themes[theme].foreground} fillRule="evenodd"/></Svg>
);

BrewIcon.propTypes = propTypes;

export default connect(mapStateToProps)(BrewIcon);
