import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';

import Card from 'components/Card';
import Instructions from 'components/Instructions';
import Question from 'components/Question';
import Image from 'components/Image';
import Warning from 'components/Warning';

import footerImage from 'assets/pour-over-bloom-default.jpg';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Brew extends Component {
  static propTypes = {
    settings: PropTypes.object,
  };

  state = {
    warning: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ warning: true }), 2000);
    setTimeout(() => this.setState({ warning: false }), 4000);
  }

  render() {
    const { theme, settings } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 12,
        }}
      >
        <Card>
          <Image source={footerImage} />
          <Question
            title="How many cups would you like to brew?"
            description="One cup is measured at 12 oz"
          />
          <Instructions text="Pour over **blankety blank** over the course of **blank**." />
          <Warning
            text="Your brew is running too long. You may want to stop the brew to prevent it from becoming bitter."
            isVisible={this.state.warning}
          />
        </Card>
      </View>
    );
  }
}

export default withSettings(withTheme(Brew));
