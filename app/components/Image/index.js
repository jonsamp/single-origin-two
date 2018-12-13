import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import withTheme from 'providers/theme';
import { height } from 'constants/layout';

const propTypes = {
  theme: PropTypes.object,
  source: PropTypes.number,
};

function CustomImage({ source, theme }) {
  return (
    <Image
      source={source}
      style={{
        backgroundColor: theme.grey3,
        resizeMode: 'cover',
        width: null,
        height: height / 5,
      }}
    />
  );
}

CustomImage.propTypes = propTypes;

export default withTheme(CustomImage);
