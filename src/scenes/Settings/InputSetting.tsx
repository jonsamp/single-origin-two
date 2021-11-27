import React from 'react';
import { TextInput } from 'react-native';

import { useTailwind } from '../../common/theme';
import SettingWrapper from './SettingWrapper';

type Props = {
  value: number;
  onChange: (value: any) => void;
  title: string;
  description: string;
  borderTop?: boolean;
};

function InputSetting(props: Props) {
  const { title, description, value, onChange, borderTop = false } = props;
  const tw = useTailwind();

  return (
    <SettingWrapper title={title} description={description} borderTop={borderTop}>
      <TextInput
        value={value.toString()}
        style={tw(
          'body rounded-md px-3 py-1 pb-1.5 border theme.border.default theme.text.default'
        )}
        keyboardType="number-pad"
        maxLength={2}
        onChangeText={(v) => onChange(Number(v))}
        returnKeyType="done"
      />
    </SettingWrapper>
  );
}

export default InputSetting;
