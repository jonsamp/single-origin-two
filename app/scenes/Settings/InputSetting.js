import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';
import styles from './styles';

const propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func,
  valueName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
};

const InputSetting = ({
  title,
  description,
  value,
  onValueChange,
  valueName,
  theme,
}) => (
  <View
    style={{
      padding: 18,
      paddingVertical: 24,
      borderBottomWidth: 1,
      borderBottomColor: theme.grey2,
    }}
  >
    <View style={styles.row}>
      <View style={styles.subContainer}>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.foreground }]}>
          {description}
        </Text>
      </View>
      <TextInput
        value={value.toString()}
        style={[
          styles.input,
          { borderColor: theme.grey3, color: theme.foreground },
        ]}
        keyboardType="number-pad"
        maxLength={2}
        onChangeText={v => onValueChange(valueName, v)}
        returnKeyType="done"
      />
    </View>
  </View>
);

InputSetting.propTypes = propTypes;

export default withTheme(InputSetting);
