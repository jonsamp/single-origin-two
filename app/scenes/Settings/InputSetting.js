import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import withTheme from 'providers/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    width: width * 0.7,
    marginTop: 6,
  },
  input: {
    width: 48,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    paddingLeft: 12,
  },
});

const propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func,
  valueName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
};

const InputSetting = ({
  title,
  description,
  value,
  onValueChange,
  valueName,
  theme,
}) => (
  <View
    style={{
      padding: 18,
      paddingVertical: 24,
      borderBottomWidth: 1,
      borderBottomColor: theme.grey2,
    }}
  >
    <View style={styles.row}>
      <View>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.foreground }]}>
          {description}
        </Text>
      </View>
      <TextInput
        value={value.toString()}
        style={[
          styles.input,
          { borderColor: theme.grey3, color: theme.foreground },
        ]}
        keyboardType="number-pad"
        maxLength={2}
        onChangeText={v => onValueChange(valueName, v)}
        returnKeyType="done"
      />
    </View>
  </View>
);

InputSetting.propTypes = propTypes;

export default withTheme(InputSetting);
