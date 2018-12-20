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

const SettingsIcon = ({ focused, theme }) => (
  <Svg width="25" height="27">
    <Svg.G
      fill={focused ? themes[theme].primary : themes[theme].foreground}
      fillRule="nonzero"
    >
      <Svg.Path d="M12.449 18.41a4.722 4.722 0 1 1 0-9.444 4.722 4.722 0 0 1 0 9.444zm0-2a2.722 2.722 0 1 0 0-5.444 2.722 2.722 0 0 0 0 5.444z" />
      <Svg.Path d="M10.479 2.6C9.588 4.66 8.894 5.783 8.153 6.159c-.655.333-1.962.447-4.13.415L2.264 9.7c1.126 1.404 1.71 2.633 1.71 3.743 0 1.115-.591 2.382-1.735 3.865l1.795 3.497c2.041-.103 3.39.034 4.168.487.788.46 1.505 1.524 2.272 3.249H14.6c.887-1.744 1.594-2.785 2.25-3.219.705-.466 2.059-.6 4.275-.511l1.632-3.49c-1.128-1.493-1.71-2.746-1.71-3.83 0-1.067.566-2.295 1.66-3.75l-1.932-3.166c-1.762.027-2.982-.087-3.731-.374-.952-.365-1.72-1.541-2.52-3.6H10.48zM7.247 4.376c.19-.096.845-1.231 1.646-3.158A1 1 0 0 1 9.816.6h5.402a1 1 0 0 1 .941.66c.687 1.907 1.316 2.963 1.6 3.072.505.193 1.716.284 3.54.23a1 1 0 0 1 .883.478l2.594 4.25a1 1 0 0 1-.077 1.152c-1.118 1.376-1.652 2.423-1.652 3.049 0 .626.535 1.681 1.654 3.069a1 1 0 0 1 .127 1.051l-2.176 4.654a1 1 0 0 1-.961.575c-2.138-.12-3.478-.022-3.738.15-.31.205-.982 1.245-1.837 2.99a1 1 0 0 1-.898.56H9.816a1 1 0 0 1-.923-.616c-.705-1.696-1.326-2.688-1.696-2.904-.388-.226-1.672-.321-3.684-.181a1 1 0 0 1-.959-.541l-2.39-4.654a1 1 0 0 1 .12-1.095c1.145-1.38 1.69-2.445 1.69-3.107 0-.653-.538-1.67-1.673-2.973a1 1 0 0 1-.118-1.147l2.389-4.251a1 1 0 0 1 .896-.51c2.142.053 3.492-.04 3.78-.187z" />
    </Svg.G>
  </Svg>
);

SettingsIcon.propTypes = propTypes;

export default connect(mapStateToProps)(SettingsIcon);
