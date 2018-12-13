import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import withTheme from 'providers/theme';
import SettingWrapper from './SettingWrapper';

const propTypes = {
  theme: PropTypes.object,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      value: PropTypes.bool,
    })
  ),
};

const ChecklistSetting = ({ theme, onChange, items }) =>
  items.map(item => (
    <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
      <SettingWrapper title={item.title}>
        {item.value ? (
          <Feather name="check" size={theme.iconSize} color={theme.primary} />
        ) : null}
      </SettingWrapper>
    </TouchableOpacity>
  ));

ChecklistSetting.propTypes = propTypes;

export default withTheme(ChecklistSetting);
