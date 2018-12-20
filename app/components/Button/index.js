import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import withTheme from 'providers/theme';
import styles from './styles';

const propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  customStyle: PropTypes.any,
  customTextStyle: PropTypes.any,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

function Button({
  theme,
  type = 'normal',
  onPress,
  title = '',
  disabled,
  customStyle,
  customTextStyle,
  loading,
}) {
  let buttonStyle = [styles.button, { backgroundColor: theme.primary }];
  let textStyle = [styles.text, { color: theme.background }, customTextStyle];

  if (type === 'secondary') {
    buttonStyle = [styles.button, { backgroundColor: theme.background }];
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

Button.propTypes = propTypes;

export default withTheme(Button);
