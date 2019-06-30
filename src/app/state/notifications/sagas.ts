import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { reminderCancelled, reminderDenied, reminderRequested } from './actions'

function* scheduleNotification({ timestamp }) {
  const localNotification = {
    title: '☕️ Your coffee is cool enough to taste',
    body: `Tap here to rate your brew.`,
    data: { timestamp },
    ios: { sound: true },
  }

  const schedulingOptions = {
    time: new Date().getTime() + /* 360000 */ 5000, // TODO: Make this 6  minutes
  }

  yield call(cancelAllNotifications)

  console.log('SCHEDULING NOTIFICATION!', {
    schedulingOptions,
    localNotification,
  }) // TODO: remove this

  yield call(
    Notifications.scheduleLocalNotificationAsync,
    localNotification,
    schedulingOptions
  )
}

function* cancelAllNotifications() {
  yield call(Notifications.cancelAllScheduledNotificationsAsync)
}

function* handleReminderRequested({ payload: { timestamp } }) {
  const {
    permissions: { notifications },
  } = yield call(Permissions.getAsync, Permissions.NOTIFICATIONS)

  // this only happens if you haven't ever asked or determined in the settings
  if (notifications.status !== 'granted') {
    const {
      permissions: { notifications: answer },
    } = yield call(Permissions.askAsync, Permissions.NOTIFICATIONS)

    if (answer.status !== 'granted') {
      return yield put(reminderDenied())
    }
  }

  yield call(scheduleNotification, { timestamp })
}

function* handleReminderCancelled() {
  yield call(cancelAllNotifications)
}

export default function* rootSaga() {
  yield takeLatest(reminderRequested, handleReminderRequested)
  yield takeLatest(reminderCancelled, handleReminderCancelled)
}
