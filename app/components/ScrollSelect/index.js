import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import withTheme from 'providers/theme';
import styles from './styles';

const propTypes = {
  theme: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

function ScrollSelect({ theme, min, max, onChange }) {
  return (
    <View style={{ backgroundColor: theme.grey3 }}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View style={styles.selection}>
          <Text>1</Text>
        </View>
        <View style={styles.selection}>
          <Text>2</Text>
        </View>
        <View style={styles.selection}>
          <Text>3</Text>
        </View>
        <View style={styles.selection}>
          <Text>4</Text>
        </View>
      </ScrollView>
    </View>
  );
}

ScrollSelect.propTypes = propTypes;

export default withTheme(ScrollSelect);
