import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import withTheme from 'providers/theme';
import SettingWrapper from './SettingWrapper';
import styles from './styles';

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
  borderTop: PropTypes.bool,
};

const InputSetting = ({
  title,
  description,
  value,
  onChange,
  theme,
  borderTop,
}) => (
  <SettingWrapper title={title} description={description} borderTop={borderTop}>
    <TextInput
      value={value.toString()}
      style={[
        styles.input,
        { borderColor: theme.grey2, color: theme.foreground },
      ]}
      keyboardType="number-pad"
      maxLength={2}
      onChangeText={v => onChange(Number(v))}
      returnKeyType="done"
    />
  </SettingWrapper>
);

InputSetting.propTypes = propTypes;

export default withTheme(InputSetting);
