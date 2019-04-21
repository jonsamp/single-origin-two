import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import withTheme from '@app/providers/theme';
import styles from './styles';

type ButtonProps = {
  theme?: any;
  type?: 'normal' | 'secondary' | 'outline';
  onPress?: () => void;
  title: string;
  customStyle?: object;
  customTextStyle?: object;
  disabled?: boolean;
  loading?: boolean;
  isDarkTheme?: boolean;
};

function Button({
  theme,
  type,
  onPress,
  title,
  disabled,
  customStyle,
  customTextStyle,
  loading,
  isDarkTheme,
}: ButtonProps) {
  let buttonStyle = [styles.button, { backgroundColor: theme.primary }];
  let textStyle = [styles.text, { color: theme.background }, customTextStyle];

  if (type === 'secondary') {
    buttonStyle = [
      styles.button,
      { backgroundColor: isDarkTheme ? theme.grey1 : theme.background },
    ];
    textStyle = [styles.text, { color: theme.foreground }];
  }

  if (type === 'outline') {
    buttonStyle = [styles.buttonOutline, { borderColor: theme.foreground }];
    textStyle = [styles.textOutline, { color: theme.foreground }];
  }

  if (disabled) {
    return (
      <TouchableOpacity
        style={[buttonStyle, styles.disabled, customStyle]}
        onPress={() => {}}
        accessibilityTraits="button"
        accessibilityComponentType="button"
        activeOpacity={0.2}
      >
        <Text style={[textStyle, customTextStyle]}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[buttonStyle, customStyle]}
        onPress={onPress}
        accessibilityTraits="button"
        accessibilityComponentType="button"
        activeOpacity={loading ? 1 : 0.6}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={textStyle}>{title.toUpperCase()}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default withTheme(Button);
