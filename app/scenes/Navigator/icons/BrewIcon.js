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
  <Svg width="37" height="27"><Svg.G fill={focused ? themes[theme].primary : themes[theme].foreground}   fillRule="evenodd"><Svg.Path d="M7.26 24.084a1 1 0 0 1-.575-1.047c.022-.159.066-.446.136-.845.114-.66.257-1.392.431-2.182.498-2.256 1.143-4.514 1.954-6.63C11.6 7.136 14.946 3.304 19.532 3.304c6.82 0 11.04 6.717 12.847 19.734a1 1 0 0 1-.601 1.058c-8.459 3.578-16.655 3.578-24.518-.011zm23.028-1.539C28.555 10.921 24.91 5.303 19.532 5.303c-3.498 0-6.33 3.245-8.459 8.794-.772 2.013-1.39 4.178-1.868 6.344a47.838 47.838 0 0 0-.42 2.13c6.91 2.949 14.057 2.943 21.503-.026z" fillRule="nonzero"/><Svg.Path d="M12.226 20.646c4.67 1.584 9.575 1.55 14.715-.1-.426-4.08-1.635-5.932-3.628-5.557-2.988.561-4.638.564-7.549 0-2.91-.565-3.538 5.657-3.538 5.657z"/><Svg.Path d="M8.909 19.918a1 1 0 0 1-1.35.422c.15.079-.475-.24-.67-.352a5.54 5.54 0 0 1-.935-.664c-1.395-1.232-2.168-3.237-2.168-6.338 0-2.94-.709-4.131-2.053-4.131a1 1 0 1 1 0-2c2.726 0 4.053 2.23 4.053 6.131 0 2.563.56 4.016 1.492 4.84.183.161.378.297.604.426.136.078.632.331.619.324a1 1 0 0 1 .408 1.342zM28.221 10.301a1 1 0 1 1-.87-1.8l4.121-1.991a1 1 0 0 1 1.422 1.059c-.181 1.127-.067 1.953.295 2.51.195.3.428.488.996.833l.082.05c.926.562 1.365.929 1.761 1.663.37.684.425 1.224.406 2.478-.01.694 0 1.002.063 1.351.054.296.144.554.282.793a1 1 0 1 1-1.734.997 4.415 4.415 0 0 1-.515-1.432c-.095-.52-.108-.917-.096-1.74.014-.9-.02-1.226-.166-1.497-.178-.33-.4-.515-1.04-.904l-.083-.05c-.806-.49-1.23-.833-1.633-1.453-.395-.607-.62-1.318-.683-2.127l-2.608 1.26zM16.49 2.11a1 1 0 1 1 0-2h6.083a1 1 0 1 1 0 2H16.49z" fillRule="nonzero"/><Svg.Path d="M18.774 3.506a1 1 0 1 1 0-2h1.515a1 1 0 1 1 0 2h-1.515z" fillRule="nonzero"/></Svg.G></Svg>
);

BrewIcon.propTypes = propTypes;

export default connect(mapStateToProps)(BrewIcon);
