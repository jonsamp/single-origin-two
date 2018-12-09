import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { settingUpdated } from 'state/settings/actions';
import { selectSettings } from 'state/settings/selectors';

const mapStateToProps = state => ({ settings: selectSettings(state) });

const mapDispatchToProps = {
  settingUpdated,
};

function withSettings(WrappedComponent) {
  class Wrapper extends Component {
    static propTypes = {
      settings: PropTypes.object,
      settingUpdated: PropTypes.func,
    };

    render() {
      const { settings, settingUpdated, ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          settings={settings}
          settingUpdated={settingUpdated}
        />
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper);
}

export default withSettings;
