import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import withTheme from '@app/providers/theme';
import recipes from '@app/constants/recipes';
import type from '@app/constants/type';
import { selectLog } from '@app/state/logs/selectors';

const mapStateToProps = (state, props) => {
  const { timestamp } = props;
  return {
    log: selectLog(state, timestamp),
  };
};

const mapDispatchToProps = {};

class Log extends Component {
  static propTypes = {
    theme: PropTypes.object,
    log: PropTypes.object,
  };

  render() {
    const { theme, log } = this.props;
    const recipe = recipes[log.recipeId];
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.background,
          alignItems: 'center',
        }}
      >
        {recipe.icon({ fill: theme.foreground, size: 2 })}
        <Text style={{ color: theme.foreground, ...type.header }}>
          {recipe.title}
        </Text>
        <View>
          <Text style={type.text}>
            Brew completed at {moment(log.timestamp).format('h:mmA')} on{' '}
            {moment(log.timestamp).format('MM/DD/YYYY')}
          </Text>
        </View>
        <Text style={{ color: theme.foreground, fontSize: 32 }}>
          {JSON.stringify(log, null, 2)}
        </Text>
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Log));
