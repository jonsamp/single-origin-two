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
  <Svg width="36" height="27" xmlns="http://www.w3.org/2000/svg"><Svg.G fill={focused ? themes[theme].primary : themes[theme].foreground}  fillRule="evenodd"><Svg.G fill-rule="nonzero"><Svg.Path d="M6.834 23.75a1 1 0 0 1-.575-1.047c.02-.153.064-.43.13-.815.111-.635.25-1.342.417-2.102.479-2.175 1.1-4.35 1.883-6.39C11 7.37 14.23 3.67 18.667 3.67c6.592 0 10.665 6.483 12.407 19.034a1 1 0 0 1-.6 1.058c-8.155 3.45-16.058 3.45-23.64-.01zm22.149-1.539C27.315 11.053 23.818 5.67 18.667 5.67c-3.348 0-6.067 3.113-8.111 8.444-.743 1.936-1.338 4.019-1.797 6.103a46.03 46.03 0 0 0-.4 2.021c6.628 2.82 13.483 2.815 20.624-.026z"/><Svg.Path d="M8.47 19.722a1 1 0 0 1-1.35.422c.145.076-.457-.231-.647-.34a5.371 5.371 0 0 1-.906-.643c-1.352-1.195-2.1-3.135-2.1-6.131 0-2.814-.671-3.941-1.94-3.941a1 1 0 1 1 0-2c2.65 0 3.94 2.167 3.94 5.94 0 2.458.536 3.848 1.424 4.633.174.154.36.283.576.407.13.074.61.32.594.31a1 1 0 0 1 .409 1.343zM27.05 10.478a1 1 0 0 1-.87-1.801l3.968-1.917a1 1 0 0 1 1.423 1.059c-.174 1.077-.065 1.863.278 2.39.184.283.405.462.947.792l.08.048c.896.544 1.323.9 1.708 1.615.36.667.414 1.19.396 2.404-.01.667 0 .961.06 1.295a2.3 2.3 0 0 0 .267.751 1 1 0 0 1-1.734.997 4.288 4.288 0 0 1-.5-1.39c-.092-.504-.105-.889-.093-1.683.013-.86-.019-1.17-.155-1.424-.168-.31-.377-.485-.988-.856l-.08-.049c-.781-.475-1.194-.807-1.585-1.41-.375-.576-.592-1.249-.66-2.011l-2.462 1.19zM15.738 2.594a1 1 0 1 1 0-2h5.857a1 1 0 1 1 0 2h-5.857z"/><Svg.Path d="M17.937 3.938a1 1 0 0 1 0-2h1.46a1 1 0 1 1 0 2h-1.46z"/></Svg.G><Svg.Path d="M11.631 20.406c4.497 1.525 9.22 1.493 14.17-.096-.41-3.928-1.574-5.713-3.493-5.352-2.878.54-4.466.543-7.27 0-2.802-.544-3.407 5.448-3.407 5.448z"/></Svg.G></Svg>
);

BrewIcon.propTypes = propTypes;

export default connect(mapStateToProps)(BrewIcon);