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
  <Svg width="22" height="22"><Svg.G fill={focused ? themes[theme].primary : themes[theme].foreground} fillRule="nonzero"><Svg.Path d="M4.848 3.393c-.803 0-1.455.652-1.455 1.455v12.604c0 .803.652 1.455 1.455 1.455h12.604c.803 0 1.455-.652 1.455-1.455V4.848c0-.803-.652-1.455-1.455-1.455H4.848zm0-2.908h12.604a4.363 4.363 0 0 1 4.363 4.363v12.604a4.363 4.363 0 0 1-4.363 4.363H4.848a4.363 4.363 0 0 1-4.363-4.363V4.848A4.363 4.363 0 0 1 4.848.485z"/><Svg.Path d="M6.21 7.917V5.794h9.88v2.123zM6.21 11.796V9.672h9.88v2.124zM6.21 15.674V13.55h7.456v2.124z"/></Svg.G></Svg>
);

LogsIcon.propTypes = propTypes;

export default connect(mapStateToProps)(LogsIcon);
