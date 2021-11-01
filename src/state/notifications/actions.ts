import { createAction } from "redux-actions";

export const notificationsReset = createAction("notifications/RESET");
export const reminderRequested = createAction(
  "notifications/REMINDER_REQUESTED"
);
export const reminderCancelled = createAction(
  "notifications/REMINDER_CANCELLED"
);
export const reminderDenied = createAction("notifications/REMINDER_DENIED");
