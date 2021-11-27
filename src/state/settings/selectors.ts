import { State } from '../../state/types';

export function selectSettings(state: State) {
  return state.settings;
}
