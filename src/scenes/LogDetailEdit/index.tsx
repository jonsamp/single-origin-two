import { iconSize, spacing } from '@expo/styleguide-native';
import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { useTailwind, useTheme } from '../../common/theme';
import { useTracking } from '../../common/useTracking';
import Button from '../../components/Button';
import Slider from '../../components/Slider';
import { isMaxWidth } from '../../constants/layout';
import { recipes } from '../../constants/recipes';
import { styleguide } from '../../constants/themes';
import { RootStackParamList } from '../../navigation';
import ChecklistSetting from '../../scenes/Settings/ChecklistSetting';
import { logUpdated, logDeleted } from '../../state/logs/actions';
import { selectLog } from '../../state/logs/selectors';
import { State } from '../../state/types';

type Props = {
  route: RouteProp<RootStackParamList, 'LogDetailEdit'>;
};

function LogDetailEdit(props: Props) {
  const { route } = props;
  const { track, events } = useTracking();
  const { theme, dark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tw = useTailwind();
  const log = useSelector((state: State) => selectLog(state, route.params.timestamp));

  useEffect(function didMount() {
    track(events.RATING_VIEWED);
  }, []);

  function updateLog(key: string, value: string | number) {
    dispatch(
      logUpdated({
        timestamp: route.params.timestamp,
        log: {
          [key]: value,
        },
      })
    );
  }

  function onDeleteLog(timestamp: number) {
    dispatch(logDeleted({ timestamp }));

    // @ts-ignore popToTop exists but doesnt on this type
    navigation.popToTop();
  }

  if (!log) {
    return <View style={tw('theme.background.default flex-1')} />;
  }

  return (
    <View style={tw('theme.background.screen flex-1')}>
      {!isMaxWidth && Platform.select({ ios: <StatusBar animated style="light" /> })}
      {Platform.select({
        ios: (
          <View
            style={tw(
              'flex-row justify-between items-center p-4 theme.background.default border-b theme.border.default'
            )}>
            <View style={tw('flex-row items-center')}>
              <Feather
                name="edit-3"
                size={iconSize.regular}
                color={theme.icon.default}
                style={{ top: spacing[0], marginRight: spacing[2] }}
              />
              <Text style={tw('headline theme.text.default')}>Edit Note</Text>
            </View>
            <View style={tw('flex-row items-center')}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={tw('pr-1')}>
                <Text style={tw('headline theme.text.default')}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
      })}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing[3],
        }}>
        <KeyboardAvoidingView behavior="padding">
          <SafeAreaView edges={['bottom']} style={tw(`${isMaxWidth ? 'items-center' : ''} mb-4`)}>
            <View
              style={
                isMaxWidth && {
                  width: styleguide.maxWidth,
                }
              }>
              <Text style={tw('body mb-6 mt-4 theme.text.default')}>
                Rate your {recipes[log.recipeId].title} brewed at {format(log.timestamp, 'h:mma')}{' '}
                on {format(log.timestamp, 'MMM d, yyyy')}.
              </Text>
              <Text style={tw('title theme.text.default')}>Tasting note</Text>
              <View style={tw('rounded-md overflow-hidden mt-4 mb-6')}>
                <ChecklistSetting
                  items={[
                    {
                      title: 'Sour',
                      id: 'sour',
                      value: log.tastingNote === 'sour',
                    },
                    {
                      title: 'Sweet',
                      id: 'sweet',
                      value: log.tastingNote === 'sweet',
                    },
                    {
                      title: 'Bitter',
                      id: 'bitter',
                      value: log.tastingNote === 'bitter',
                    },
                  ]}
                  onChange={(value) => updateLog('tastingNote', value)}
                />
              </View>
              <Text style={tw('title theme.text.default')}>Overall rating</Text>
              <View style={tw('rounded-md overflow-hidden mt-4 mb-6 border theme.border.default')}>
                <Slider
                  min={1}
                  max={10}
                  defaultValue={log.rating ?? 5}
                  label="rating"
                  onChange={(value) => updateLog('rating', value)}
                  style={tw('theme.background.default')}
                />
              </View>
              <Text style={tw('title theme.text.default')}>Notes</Text>
              <TextInput
                style={tw(
                  'h-40 theme.border.default border rounded-md theme.background.overlay p-4 mt-4 body theme.text.default'
                )}
                multiline
                onChangeText={(value) => updateLog('notes', value)}
                value={log.notes}
                keyboardAppearance={dark ? 'dark' : 'default'}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={tw('title theme.text.default mt-8 mb-4')}>Delete note</Text>
              <Button
                onPress={() => onDeleteLog(log.timestamp)}
                title="Delete Note"
                type="outline"
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default LogDetailEdit;
