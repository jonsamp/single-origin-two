import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Animated, Dimensions } from 'react-native';
import Fade from 'react-native-fade';
import styles from './styles';

const { height } = Dimensions.get('window');

class HeaderScrollView extends Component {
  static propTypes = {
    headerTitle: PropTypes.string,
    children: PropTypes.node,
    containerStyle: PropTypes.object,
    headerContainerStyle: PropTypes.object,
    headerComponentContainerStyle: PropTypes.object,
    headerTextStyle: PropTypes.object,
    headerTitleStyle: PropTypes.object,
    scrollContainerStyle: PropTypes.object,
  };

  state = {
    headerHeight: 0,
    headerY: 0,
    isHeaderScrolled: false,
  };

  onLayout = event => {
    this.setState({
      headerHeight: event.nativeEvent.layout.height,
      headerY: event.nativeEvent.layout.y,
    });
  };

  scrollAnimatedValue = new Animated.Value(0);

  handleScroll = event => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = this.state.headerHeight + this.state.headerY - 8;
    const isHeaderScrolled = scrollHeaderOffset < offset;

    if (!this.state.isHeaderScrolled && isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }

    if (this.state.isHeaderScrolled && !isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }
  };

  render() {
    const {
      children,
      headerTitle,
      containerStyle,
      headerContainerStyle,
      headerComponentContainerStyle,
      headerTextStyle,
      headerTitleStyle,
      scrollContainerStyle,
    } = this.props;

    const animatedFontSize = this.scrollAnimatedValue.interpolate({
      inputRange: [-height, 0],
      outputRange: [60, 34],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          <Fade visible={this.state.isHeaderScrolled} direction="up">
            <View
              style={[
                styles.headerComponentContainer,
                headerComponentContainerStyle,
              ]}
            >
              <Text style={[styles.headerText, headerTextStyle]}>
                {headerTitle}
              </Text>
            </View>
          </Fade>
        </View>
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } },
              },
            ],
            {
              listener: this.handleScroll,
            }
          )}
          scrollEventThrottle={8}
          style={scrollContainerStyle}
        >
          <View>
            <Animated.Text
              style={[
                styles.headerTitle,
                headerTitleStyle,
                {
                  fontSize: animatedFontSize,
                },
              ]}
              onLayout={this.onLayout}
            >
              {headerTitle}
            </Animated.Text>
          </View>
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default HeaderScrollView;
