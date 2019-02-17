import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import withTheme from 'providers/theme';
import recipes from 'constants/recipes';
import type from 'constants/type';
import { selectLog } from 'state/logs/selectors';

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

  state = {};

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
          <Text>{new Date(log.timestamp).toString()}</Text>
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
