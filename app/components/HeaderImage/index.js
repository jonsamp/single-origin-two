import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { height, width } from 'constants/layout';
import withTheme from 'providers/theme';

const propTypes = {
  source: PropTypes.number,
  theme: PropTypes.object,
};

function HeaderImage({ source, theme }) {
  const imageHeight = height / 4;
  const gradientHeight = height / 4;
  return (
    <View style={{ marginBottom: -72 }}>
      <Image
        source={source}
        style={{
          width: width + 12,
          height: imageHeight,
          resizeMode: 'cover',
          left: -12,
          top: -12,
        }}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', theme.background]}
        style={{
          position: 'absolute',
          width: width + 12,
          left: -12,
          height: gradientHeight,
          top: imageHeight - gradientHeight - 12,
        }}
      />
    </View>
  );
}

HeaderImage.propTypes = propTypes;

export default withTheme(HeaderImage);
