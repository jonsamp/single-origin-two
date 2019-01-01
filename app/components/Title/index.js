import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { random } from 'lodash';
import withTheme from 'providers/theme';
import OneIcon from './icons/OneIcon';
import TwoIcon from './icons/TwoIcon';
import ThreeIcon from './icons/ThreeIcon';
import FourIcon from './icons/FourIcon';
import FiveIcon from './icons/FiveIcon';
import styles from './styles';

const propTypes = {
  theme: PropTypes.object,
  title: PropTypes.string,
};

function Title({ title, theme }) {
  const icons = [
    <OneIcon fill={theme.primary} />,
    <TwoIcon fill={theme.primary} />,
    <ThreeIcon fill={theme.primary} />,
    <FourIcon fill={theme.primary} />,
    <FiveIcon fill={theme.primary} />,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {icons[random(0, icons.length)]}
      </View>
      <Text
        style={[
          styles.title,
          {
            color: theme.foreground,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

Title.propTypes = propTypes;

export default withTheme(Title);
