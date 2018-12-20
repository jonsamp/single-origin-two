import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SectionList, View, Text, ScrollView } from 'react-native';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';

import Card from 'components/Card';
import Instructions from 'components/Instructions';
import Question from 'components/Question';
import Image from 'components/Image';
import Warning from 'components/Warning';
import ScrollSelect from 'components/ScrollSelect';
import PourTimer from 'components/PourTimer';

import footerImage from 'assets/pour-over-bloom-default.jpg';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Brew extends Component {
  static propTypes = {
    settings: PropTypes.object,
  };

  state = {
    warning: false,
    numberOfCups: 1,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ warning: true }), 2000);
    setTimeout(() => this.setState({ warning: false }), 4000);
  }

  render() {
    const { theme, settings } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            paddingTop: 90,
          }}
        >
          <Card>
            <Question
              title="How many cups would you like to brew? "
              description="One cup is typically 8oz."
            />
            <ScrollSelect min={1} max={4} label="cups" />
          </Card>
          <View style={{ height: 64 }} />
          <Card>
            <Image source={footerImage} />
            <Instructions text="Over the course of **4 minutes**, pour **2.5 cups** of hot water over the coffee in the Chemex." />
            <PourTimer />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default withSettings(withTheme(Brew));
