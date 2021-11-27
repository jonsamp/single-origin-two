import { shadows } from '@expo/styleguide-native';
import React from 'react';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';

import { useTheme, useTailwind } from '../../common/theme';
import { height } from '../../constants/layout';
import { Recipe } from '../../constants/recipes';
import { ArrowIcon } from './icons/ArrowIcon';

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
      <View style={shadows.medium}>
        <ImageBackground
          source={recipe.image}
          style={[
            tw('rounded-2xl overflow-hidden bg-black'),
            {
              minHeight: 200,
              maxHeight: 240,
              height: height / 4,
            },
          ]}
          imageStyle={{
            minHeight: 200,
            maxHeight: 240,
            opacity: 0.65,
          }}>
          <View style={tw('p-5')}>
            <Text style={tw('scriptTitle text-white')}>{recipe.title}</Text>
            <Text style={tw('subheader text-white font-normal')}>{recipe.modifier}</Text>
          </View>
          <View
            style={[
              tw('absolute bottom-0 right-0 m-5 rounded-full'),
              {
                backgroundColor: theme.brand.default,
              },
            ]}>
            <ArrowIcon color={theme.background.default} />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
