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
  <Svg width="27" height="24"><Svg.G fill={focused ? themes[theme].primary : themes[theme].foreground}   fillRule="nonzero"><Svg.Path d="M6.032 8.35a1 1 0 1 1 0-2h14.885a1 1 0 0 1 0 2H6.032zM5.9 16.336a1 1 0 0 1 0-2h11.166a1 1 0 1 1 0 2H5.901zM6.032 12.307a1 1 0 0 1 0-2h14.885a1 1 0 1 1 0 2H6.032z"/><Svg.Path d="M4 2.456a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h19a2 2 0 0 0 2-2v-15a2 2 0 0 0-2-2H4zm0-2h19a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-15a4 4 0 0 1 4-4z"/></Svg.G></Svg>
);

LogsIcon.propTypes = propTypes;

export default connect(mapStateToProps)(LogsIcon);
