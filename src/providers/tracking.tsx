import React, { Component } from 'react';
import { connect } from 'react-redux';

import trackingEvents from '../constants/trackingEvents';
import { selectSettings } from '../state/settings/selectors';
import { Settings } from '../state/settings/types';
import { eventTracked } from '../state/tracking/actions';
import { State } from '../state/types';

export interface Tracking {
  track: (event: string, options?: object) => void;
  events: {
    [i: string]: string;
  };
}

interface WrapperProps {
  eventTracked: (props: { event: string; options?: object }) => void;
  settings: Settings;
}

const mapStateToProps = (state: State) => ({
  settings: selectSettings(state),
});

const mapDispatchToProps = {
  eventTracked,
};

function withTracking(WrappedComponent) {
  class Wrapper extends Component<WrapperProps> {
    track = (event, options) => {
      const { eventTracked, settings } = this.props;

      if (settings.shareTrackingData) {
        eventTracked({ event, options });
      }
    };

    render() {
      const { ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          tracking={{
            track: this.track,
            events: trackingEvents,
          }}
        />
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}

export default withTracking;
