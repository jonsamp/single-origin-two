import React from 'react';
import { Switch } from 'react-native';

import SettingWrapper from './SettingWrapper';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
  disabled?: boolean;
};

const SwitchSetting = (props: Props) => {
  const { title, value, onChange, disabled } = props;

  return (
    <SettingWrapper title={title}>
      <Switch value={value} onValueChange={(v) => onChange(v)} disabled={disabled} />
    </SettingWrapper>
  );
};

export default SwitchSetting;
