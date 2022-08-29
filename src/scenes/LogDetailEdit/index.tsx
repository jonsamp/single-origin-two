import { iconSize, spacing, typography } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../common/theme';
import Button from '../../components/Button';
import Slider from '../../components/Slider';
import { Text } from '../../components/Text';
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
  const { theme, dark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tw = useTailwind();
  const log = useSelector((state: State) => selectLog(state, route.params.timestamp));

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
    return <View style={tw('bg-default dark:bg-default-dark flex-1')} />;
  }

  return (
    <View style={tw('bg-screen dark:bg-screen-dark flex-1')}>
      {!isMaxWidth && Platform.select({ ios: <StatusBar animated style="light" /> })}
      {Platform.select({
        ios: (
          <View
            style={tw(
              'flex-row justify-between items-center p-4 bg-default dark:bg-default-dark border-b border-default dark:border-default-dark'
            )}>
            <View style={tw('flex-row items-center')}>
              <Feather
                name="edit-3"
                size={iconSize.regular}
                color={theme.icon.default}
                style={{ top: spacing[0], marginRight: spacing[2] }}
              />
              <Text type="headline">Edit Note</Text>
            </View>
            <View style={tw('flex-row items-center')}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={tw('pr-1')}>
                <Text type="headline">Save</Text>
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
              <Text style={tw('mb-6 mt-4')}>
                Rate your {recipes[log.recipeId].title} brewed at {format(log.timestamp, 'h:mma')}{' '}
                on {format(log.timestamp, 'MMM d, yyyy')}.
              </Text>
              <Text type="title">Tasting note</Text>
              <View style={tw('rounded-md overflow-hidden mt-4 mb-6 border border-default')}>
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
              <Text type="title">Overall rating</Text>
              <View
                style={tw(
                  'rounded-md overflow-hidden mt-4 mb-6 border border-default dark:border-default-dark'
                )}>
                <Slider
                  min={1}
                  max={10}
                  defaultValue={log.rating ?? 5}
                  label="rating"
                  onChange={(value) => updateLog('rating', value)}
                  style={tw('bg-default dark:bg-default-dark')}
                />
              </View>
              <Text type="title">Notes</Text>
              <TextInput
                style={[
                  tw(
                    'text-default dark:text-default-dark h-40 border-default dark:border-default-dark border rounded-md bg-overlay dark:bg-overlay-dark p-4 mt-4'
                  ),
                  typography.body,
                ]}
                multiline
                onChangeText={(value) => updateLog('notes', value)}
                value={log.notes}
                keyboardAppearance={dark ? 'dark' : 'default'}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text type="title" style={tw('mt-8 mb-4')}>
                Delete note
              </Text>
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
