import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native';
import withTheme from 'providers/theme';
import styles from './styles';

const propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
  valueName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
};

const SwitchSetting = ({
  title,
  description,
  value,
  onValueChange,
  valueName,
  theme,
}) => (
  <View
    style={[
      styles.container,
      { borderTopColor: theme.grey2, borderBottomColor: theme.grey2 },
    ]}
  >
    <View style={styles.row}>
      <View style={styles.subContainer}>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: theme.foreground }]}>
            {description}
          </Text>
        ) : null}
      </View>
      <Switch value={value} onValueChange={v => onValueChange(valueName, v)} />
    </View>
  </View>
);

SwitchSetting.propTypes = propTypes;

export default withTheme(SwitchSetting);
