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
  <Svg width="21" height="21">
    <Svg.G
      fill={focused ? themes[theme].primary : themes[theme].foreground}
      fillRule="nonzero"
    >
      <Svg.Path d="M2.942 2.942V18.41H18.41V2.942H2.942zM1.722.5H19.63c.674 0 1.22.547 1.22 1.221v17.91c0 .674-.546 1.22-1.22 1.22H1.72A1.221 1.221 0 0 1 .5 19.632V1.72C.5 1.047 1.047.5 1.721.5z" />
      <Svg.Path d="M4.163 7.07V4.629h12.64v2.443zM4.163 11.141V8.699h12.64v2.442zM4.163 15.211V12.77h8.955v2.442z" />
    </Svg.G>
  </Svg>
);

LogsIcon.propTypes = propTypes;

export default connect(mapStateToProps)(LogsIcon);
