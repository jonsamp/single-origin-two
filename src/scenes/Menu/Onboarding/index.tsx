import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { iconSize, spacing } from '@expo/styleguide-native';

import Card from '../../../components/Card';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation';
import { useTailwind, useTheme } from '../../../common/theme';

function Onboarding() {
  const { theme } = useTheme();
  const tw = useTailwind();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Onboarding')} activeOpacity={0.7}>
      <Card containerStyle={{ marginBottom: spacing[6] }}>
        <View style={tw('flex-row justify-between items-center p-5')}>
          <Text style={tw('body theme.text.default')}>Get started with Single Origin</Text>
          <Feather name="chevron-right" size={iconSize.regular} color={theme.icon.default} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default Onboarding;
