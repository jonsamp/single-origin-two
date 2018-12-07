import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Switch, Dimensions } from 'react-native';
import withTheme from 'providers/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
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
});

const propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
  valueName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
};

const SwitchSetting = ({
  title,
  description,
  value,
  onValueChange,
  valueName,
  theme,
}) => (
  <View
    style={[
      styles.container,
      { borderTopColor: theme.grey2, borderBottomColor: theme.grey2 },
    ]}
  >
    <View style={styles.row}>
      <View>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: theme.foreground }]}>
            {description}
          </Text>
        ) : null}
      </View>
      <Switch value={value} onValueChange={v => onValueChange(valueName, v)} />
    </View>
  </View>
);

SwitchSetting.propTypes = propTypes;

export default withTheme(SwitchSetting);
