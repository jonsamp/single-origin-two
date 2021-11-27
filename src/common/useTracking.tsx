import { useSelector, useDispatch } from 'react-redux';

import trackingEvents from '../constants/trackingEvents';
import { selectSettings } from '../state/settings/selectors';
import { eventTracked } from '../state/tracking/actions';

export function useTracking() {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  function track(event: string, options?: any) {
    if (settings.shareTrackingData) {
      dispatch(eventTracked({ event, options }));
    }
  }

  return {
    track,
    events: trackingEvents,
  };
}
