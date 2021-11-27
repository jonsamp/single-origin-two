import React from 'react';
import { ScrollView, View } from 'react-native';
import { spacing } from '@expo/styleguide-native';

import withSettings from '../../providers/settings';
import { useTailwind } from '../../common/theme';
import Recipe from './Recipe';
import recipes from './recipes';
import { useNavigation } from '@react-navigation/core';
import { BrewRecipeName } from './recipes/types';

type Props = {
  route: {
    params: {
      id: BrewRecipeName;
    };
  };
};

function Brew(props: Props) {
  const { route } = props;
  const navigation = useNavigation();
  const tw = useTailwind();
  const { id } = route.params;
  const recipe = recipes[id];

  return (
    <View style={tw('flex-1 theme.background.default')}>
      <ScrollView
        contentContainerStyle={{
          padding: spacing[3],
          alignItems: 'center',
          paddingTop: spacing[8],
        }}
      >
        <View style={tw('w-full')}>
          <Recipe recipe={recipe} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

export default withSettings(Brew);
