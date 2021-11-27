import { iconSize } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';

import { useTheme } from '../../common/theme';
import SettingWrapper from './SettingWrapper';

type Props = {
  onChange: (id: string) => void;
  items: {
    title: string;
    modifier?: string;
    id: string;
    value: boolean;
  }[];
};

function ChecklistSetting(props: Props) {
  const { onChange, items } = props;
  const { theme } = useTheme();

  return (
    <Fragment>
      {items.map((item, index) => (
        <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
          <SettingWrapper
            title={`${item.title}${item.modifier ? ` ${item.modifier}` : ''}`}
            style={{
              ...{ borderBottomWidth: 1 }, // TODO: this is a different design
            }}
          >
            {item.value ? (
              <Feather name="check" size={iconSize.regular - 3} color={theme.icon.default} />
            ) : null}
          </SettingWrapper>
        </TouchableOpacity>
      ))}
    </Fragment>
  );
}

export default ChecklistSetting;
