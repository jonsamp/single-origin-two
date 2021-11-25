import { iconSize } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import React, { Fragment } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '../../common/theme';
import { MenuItem } from '../../types';
import SettingWrapper from './SettingWrapper';

type Props = {
  onChange: (id: string) => void;
  items: EnhancedMenuItem[];
  style?: ViewStyle;
};

interface EnhancedMenuItem extends MenuItem {
  value: boolean;
}

function ChecklistSetting(props: Props) {
  const { onChange, items, style } = props;
  const { theme } = useTheme();

  return (
    <Fragment>
      {items.map((item, index) => (
        <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
          <SettingWrapper
            title={`${item.title}${item.modifier ? ` ${item.modifier}` : ''}`}
            style={{
              ...style,
              ...(index === items.length - 1 ? { borderBottomWidth: 0 } : null),
              ...{ borderBottomWidth: 1 },
            }}
          >
            {item.value ? (
              <Feather
                name='check'
                size={iconSize.regular - 3}
                color={theme.icon.default}
              />
            ) : null}
          </SettingWrapper>
        </TouchableOpacity>
      ))}
    </Fragment>
  );
}

export default ChecklistSetting;
