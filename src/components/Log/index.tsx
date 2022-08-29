import { iconSize, WarningIcon } from '@expo/styleguide-native';
import Feather from '@expo/vector-icons/Feather';
import { addMinutes, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTailwind } from 'tailwind-rn';

import { useTheme } from '../../common/theme';
import { useSettings } from '../../common/useSettings';
import Card from '../../components/Card';
import ResponsiveScrollView from '../../components/ResponsiveScrollView';
import { Text } from '../../components/Text';
import { recipes } from '../../constants/recipes';
import formatSeconds from '../../helpers/formatSeconds';
import { selectLog } from '../../state/logs/selectors';
import { Log as LogType } from '../../state/logs/types';
import {
  notificationsReset,
  reminderCancelled,
  reminderRequested,
} from '../../state/notifications/actions';
import { selectNotifications } from '../../state/notifications/selectors';
import { State } from '../../state/types';

type Props = {
  timestamp: number;
  withReminder?: boolean;
  style?: ViewStyle;
};

function Log(props: Props) {
  const { withReminder, style, timestamp } = props;
  const { unitHelpers } = useSettings();
  const [reminderScheduled, setReminderScheduled] = useState(false);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const tw = useTailwind();
  const log = useSelector((state: State) => selectLog(state, timestamp));
  const notifications = useSelector(selectNotifications);
  const recipe = recipes[log.recipeId];
  const logConfig: { [i: string]: any } = {
    totalVolume: (val: number) => ({
      value: `${unitHelpers.waterVolumeUnit.getPreferredValue(val)}${
        unitHelpers.waterVolumeUnit.unit.symbol
      }`,
      label: 'Volume brewed',
    }),
    temp: (val: number) => ({
      value: `${unitHelpers.temperatureUnit.getPreferredValue(val)}${
        unitHelpers.temperatureUnit.unit.symbol
      }`,
      label: 'Temperature',
    }),
    grind: (val: number) => ({
      value: unitHelpers.grindUnit.getPreferredValue(val),
      label: 'Grind setting',
    }),
    totalBrewTime: (val: number) => ({
      value: formatSeconds(val < 0 ? 0 : val),
      label: 'Brew time',
    }),
    ratio: (val: number) => ({
      value: `1:${val}`,
      label: 'Ratio',
    }),
    tastingNote: 'Tasting Note',
    rating: 'Rating',
    notes: 'Notes',
  };
  const logStats = Object.keys(log)
    .filter((logKey) => logConfig[logKey] && typeof logConfig[logKey] === 'function')
    .map((logKey) => logConfig[logKey](log[logKey as keyof LogType]));

  useEffect(function didMount() {
    if (withReminder) {
      dispatch(notificationsReset());
    }
  }, []);

  async function toggleReminder() {
    if (!reminderScheduled) {
      dispatch(
        reminderRequested({
          timestamp: log.timestamp,
        })
      );
      return setReminderScheduled(true);
    } else {
      dispatch(reminderCancelled());
      return setReminderScheduled(false);
    }
  }

  function capitalizeFirstLetter(text: string) {
    return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
  }

  return (
    <ResponsiveScrollView wrapperStyle={tw('bg-screen dark:bg-screen-dark')} style={style}>
      <View style={tw('items-center')}>
        {recipe.icon({
          fill: theme.icon.default,
          size: 2,
        })}
        <Text type="header" style={tw('my-4')}>
          {recipe.title} {recipe.modifier}
        </Text>
        <View>
          <Text>
            Brewed at {format(log.timestamp, 'h:mma')} on {format(log.timestamp, 'MMM d, yyyy')}
          </Text>
        </View>
      </View>
      <View style={tw('mt-6')}>
        {['tastingNote', 'rating']
          .filter((key) => log[key as keyof LogType])
          .map((key, index) => (
            <Card
              key={key}
              style={tw('flex-row justify-between p-4')}
              containerStyle={{
                ...tw(`mt-1 ${index === 0 ? 'mb-3' : ''} mx-2`),
                ...{ elevation: 0, shadowOpacity: 0 },
              }}>
              <Text type="headline">{logConfig[key]}</Text>
              <Text>{capitalizeFirstLetter(log[key as keyof LogType] as string)}</Text>
            </Card>
          ))}
      </View>
      {log.notes ? (
        <Card
          style={tw('p-4')}
          containerStyle={{
            ...tw('mb-0 mx-2'),
            ...{ shadowOpacity: 0, elevation: 0 },
          }}>
          <Text type="headline" style={tw('mb-1')}>
            Notes
          </Text>
          <Text>{log.notes.trim()}</Text>
        </Card>
      ) : null}

      {withReminder && notifications.status !== 'denied' ? (
        <TouchableOpacity onPress={toggleReminder} activeOpacity={0.75}>
          <Card
            containerStyle={tw(
              'mt-4 mb-0 mx-2 p-4 bg-overlay dark:bg-overlay-dark border border-default dark:border-default-dark'
            )}
            style={tw('flex-row justify-between border-0')}>
            <View style={tw('flex-1 mr-8')}>
              <Text type="headline">
                {reminderScheduled ? 'Tasting reminder scheduled' : 'Send a tasting reminder'}
              </Text>
              {reminderScheduled && (
                <Text theme="secondary">
                  You'll get a reminder to taste your coffee at{' '}
                  {format(addMinutes(new Date(), 6), 'h:mma')}.
                </Text>
              )}
            </View>
            {reminderScheduled ? (
              <Feather name="check-square" size={iconSize.regular} color={theme.icon.default} />
            ) : (
              <Feather name="plus-square" size={iconSize.regular} color={theme.icon.default} />
            )}
          </Card>
        </TouchableOpacity>
      ) : null}
      {withReminder && notifications.status === 'denied' ? (
        <Card
          containerStyle={tw('mt-4 mb-0 mx-2 p-4 bg-overlay dark:bg-overlay-dark')}
          style={tw('flex-row justify-between')}>
          <View style={tw('flex-1 mr-8')}>
            <Text type="headline" style={tw('mb-1')}>
              Send a tasting reminder
            </Text>
            <Text theme="secondary">
              To send reminders, turn on notification permissions in Settings.
            </Text>
          </View>
          <WarningIcon size={iconSize.small} color={theme.icon.default} />
        </Card>
      ) : null}
      <View style={tw('flex-row flex-wrap mt-4')}>
        {logStats.map((stat) => (
          <View style={tw('w-6/12')} key={stat.label}>
            <Card containerStyle={tw('px-2 mb-4')} style={tw('items-center py-8')}>
              <Text type="header" style={tw('mb-2')}>
                {stat.value}
              </Text>
              <Text>{stat.label}</Text>
            </Card>
          </View>
        ))}
      </View>
    </ResponsiveScrollView>
  );
}

export default Log;
