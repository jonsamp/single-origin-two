import React from "react";
import { Switch } from "react-native";
import SettingWrapper from "./SettingWrapper";

interface SwitchSettingProps {
  value: boolean;
  onChange: (props: any) => void;
  title: string;
  description?: string;
  borderTop?: boolean;
  disabled?: boolean;
}

const SwitchSetting = ({
  title,
  description,
  value,
  onChange,
  borderTop,
  disabled,
}: SwitchSettingProps) => (
  <SettingWrapper title={title} description={description} borderTop={borderTop}>
    <Switch
      value={value}
      onValueChange={(v) => onChange(v)}
      disabled={disabled}
    />
  </SettingWrapper>
);

export default SwitchSetting;
