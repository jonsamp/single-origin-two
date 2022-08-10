import { iconSize } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../common/theme';
import { Text } from '../../components/Text';
import { RootStackParamList } from '../../navigation';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: number;
};

function Group(props: Props) {
  const { title, onPress, icon } = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const tw = useTailwind();

  return (
    <TouchableOpacity
      style={tw(`flex-1 flex-row justify-between items-center h-12 px-4`)}
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        navigation.navigate('SettingsDetail', { title });
      }}>
      <View style={tw('flex-row flex-1 items-center')}>
        {icon && (
          <Image
            source={icon}
            style={tw(
              'h-8 w-8 mr-3.5 rounded-md overflow-hidden bg-tertiary dark:bg-tertiary-dark'
            )}
          />
        )}
        <Text>{title}</Text>
      </View>
      <Feather name="chevron-right" size={iconSize.large} color={theme.icon.secondary} />
    </TouchableOpacity>
  );
}

export default Group;
