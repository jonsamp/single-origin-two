import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import Log from '../../components/Log';
import { isMaxWidth, height } from '../../constants/layout';
import styles from './styles';
import { styleguide } from '../../constants/themes';
import { RouteProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation';

type Props = {
  route: RouteProp<RootStackParamList, 'BrewSummary'>;
};

function BrewSummary(props: Props) {
  const { route } = props;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  //@ts-ignore poptotop does exist on navigation
  const onBack = () => navigation.popToTop();

  return (
    <View style={{ flex: 1 }}>
      <Log
        timestamp={route.params.timestamp}
        withReminder
        style={{ paddingBottom: 120 }}
      />
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <View
          style={[
            styles.buttonContainer,
            isMaxWidth && {
              width: styleguide.maxWidth,
            },
          ]}
        >
          <Button
            title='done'
            type='tertiary'
            customStyle={[
              {
                ...(isMaxWidth
                  ? {
                      marginBottom: insets.bottom + 16,
                    }
                  : {
                      paddingBottom: insets.bottom + height,
                      marginHorizontal: -16,
                      marginBottom: -height,
                    }),
              },
            ]}
            onPress={onBack}
          />
        </View>
      </View>
    </View>
  );
}

export default BrewSummary;
