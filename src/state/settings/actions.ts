import { createAction } from 'redux-actions';

export const settingUpdated = createAction('settings/SETTING_UPDATED');
export const themeUpdated = createAction('settings/THEME_UPDATED');
export const autoThemeUpdated = createAction('settings/AUTO_THEME_UPDATED');
