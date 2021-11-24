import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TextStyle, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type from '../../constants/type';
import withTheme from '../../providers/theme';
import { Theme } from '../../types/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';

interface GroupProps {
  title: string;
  theme: Theme;
  isDarkTheme?: boolean;
  onPress?: () => void;
}

function Group(props: GroupProps) {
  const { title, theme, isDarkTheme, onPress } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        paddingLeft: 16,
        backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
        borderBottomColor: theme.border,
        borderBottomWidth: 1,
      }}
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        navigation.navigate('SettingsDetail', { title });
      }}
    >
      <Text style={[type.body, { color: theme.text }] as TextStyle}>
        {title}
      </Text>
      <Feather
        name='chevron-right'
        size={theme.iconSize}
        color={theme.text}
        style={{ opacity: 0.65 }}
      />
    </TouchableOpacity>
  );
}

export default withTheme(Group);
