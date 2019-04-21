import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import withTheme from '@app/providers/theme';
import styles from './styles';

type HeaderProps = {
  navigation: any;
  theme: any;
  title: string;
  right: any;
  isDarkTheme: boolean;
  onBack: () => void;
};

function Header({
  navigation,
  theme,
  title,
  right,
  isDarkTheme,
  onBack,
}: HeaderProps) {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: isDarkTheme ? theme.grey1 : theme.grey2,
          backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View />
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => (onBack ? onBack() : navigation.goBack())}
            style={{ padding: 12, top: 12, right: 12 }}
          >
            <Feather name="chevron-left" size={30} color={theme.foreground} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <View style={styles.right}>{right}</View>
        <View />
      </View>
    </View>
  );
}

export default withTheme(withNavigation(Header));
