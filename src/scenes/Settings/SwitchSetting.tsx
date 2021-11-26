import React from "react";
import { Switch } from "react-native";
import SettingWrapper from "./SettingWrapper";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
  description?: string;
  borderTop?: boolean;
  disabled?: boolean;
};

const SwitchSetting = (props: Props) => {
  const { title, description, value, onChange, borderTop, disabled } = props;

  return (
    <SettingWrapper
      title={title}
      description={description}
      borderTop={borderTop}
    >
      <Switch
        value={value}
        onValueChange={(v) => onChange(v)}
        disabled={disabled}
      />
    </SettingWrapper>
  );
};

export default SwitchSetting;
