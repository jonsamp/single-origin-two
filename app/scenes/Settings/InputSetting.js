import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import withTheme from 'providers/theme';
import SettingWrapper from './SettingWrapper';
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
  <SettingWrapper title={title} description={description}>
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
  </SettingWrapper>
);

InputSetting.propTypes = propTypes;

export default withTheme(InputSetting);
