import { iconSize, CheckIcon } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useTheme } from '../../common/theme';
import { Separator } from '../../components/Separator';
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
    <>
      {items.map((item, index) => (
        <TouchableOpacity onPress={() => onChange(item.id)} key={item.id}>
          <SettingWrapper title={`${item.title}${item.modifier ? ` ${item.modifier}` : ''}`}>
            {item.value ? <CheckIcon color={theme.icon.default} /> : null}
          </SettingWrapper>
          {items.length === index + 1 ? null : <Separator />}
        </TouchableOpacity>
      ))}
    </>
  );
}

export default ChecklistSetting;
