import { shadows, ArrowRightIcon } from '@expo/styleguide-native';
import React from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../common/theme';
import { Text } from '../../components/Text';
import { height } from '../../constants/layout';
import { Recipe } from '../../constants/recipes';

type Props = {
  recipe: Recipe;
  onPress?: () => void;
};

export default function MenuItem(props: Props) {
  const { onPress, recipe } = props;
  const { theme } = useTheme();
  const tw = useTailwind();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={tw('mb-8')}>
      <View style={shadows.tiny}>
        <ImageBackground
          source={recipe.image}
          style={[
            tw('rounded-xl overflow-hidden bg-black'),
            {
              height: height / 5,
            },
          ]}
          imageStyle={{
            opacity: 0.65,
          }}>
          <View style={tw('p-5')}>
            <Text type="scriptTitle" style={tw('text-white')}>
              {recipe.title}
            </Text>
            <Text style={tw('text-white')}>{recipe.modifier}</Text>
          </View>
          <View
            style={[
              tw('absolute bottom-0 right-0 m-5 rounded-full p-2'),
              {
                backgroundColor: theme.brand.default,
              },
            ]}>
            <ArrowRightIcon />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
