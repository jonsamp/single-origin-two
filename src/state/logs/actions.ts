import { createAction } from "redux-actions";

export const logAdded = createAction("logs/ADDED");
export const logUpdated = createAction("logs/UPDATED");
export const logDeleted = createAction("logs/DELETED");
