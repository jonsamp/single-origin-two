import { iconSize } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useTailwind, useTheme } from '../../common/theme';
import { RootStackParamList } from '../../navigation';

type Props = {
  title: string;
  onPress?: () => void;
};

function Group(props: Props) {
  const { title, onPress } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const tw = useTailwind();

  return (
    <TouchableOpacity
      style={tw(
        'flex-1 flex-row justify-between items-center h-12 px-4 theme.background.overlay border-b theme.border.default'
      )}
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        navigation.navigate('SettingsDetail', { title });
      }}>
      <Text style={tw('body theme.text.default')}>{title}</Text>
      <Feather name="chevron-right" size={iconSize.regular} color={theme.icon.secondary} />
    </TouchableOpacity>
  );
}

export default Group;
