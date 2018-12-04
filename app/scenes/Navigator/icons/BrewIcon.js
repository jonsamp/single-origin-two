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
  <Svg width="23" height="18">
    <Svg.Path
      d="M19.086 7.194a3.35 3.35 0 1 1-1.823 5.794C15.616 15.963 12.993 18 9.615 18 3.62 18 .044 11.267 0 4.897c-.044-6.37 19.23-6.687 19.23 0 0 .773-.05 1.541-.144 2.297zM9.59 8.245c3.212 0 5.816-1.197 5.816-2.674 0-1.476-2.604-2.673-5.816-2.673-3.212 0-5.816 1.197-5.816 2.673 0 1.477 2.604 2.674 5.816 2.674zm9.933 3.503a1.232 1.232 0 1 0 0-2.464 1.232 1.232 0 0 0 0 2.464z"
      fillRule="evenodd"
      fill={focused ? themes[theme].primary : themes[theme].foreground}
    />
  </Svg>
);

BrewIcon.propTypes = propTypes;

export default connect(mapStateToProps)(BrewIcon);
