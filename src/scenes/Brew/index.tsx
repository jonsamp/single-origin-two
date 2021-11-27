import { RouteProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { useTailwind } from '../../common/theme';
import { RootStackParamList } from '../../navigation';
import Recipe from './Recipe';
import recipes from './recipes';

type Props = {
  route: RouteProp<RootStackParamList, 'Brew'>;
};

function Brew(props: Props) {
  const { route } = props;
  const navigation = useNavigation();
  const tw = useTailwind();
  const { id } = route.params;
  const recipe = recipes[id];

  return (
    <View style={tw('flex-1 theme.background.default')}>
      <ScrollView contentContainerStyle={tw('p-3 items-center pt-8')}>
        <View style={tw('w-full')}>
          <Recipe recipe={recipe} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Brew;
