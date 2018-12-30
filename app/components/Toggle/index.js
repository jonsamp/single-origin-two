import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import withTheme from 'providers/theme';

class Toggle extends Component {
  static propTypes = {
    theme: PropTypes.object,
    options: PropTypes.array,
  };

  state = {
    pan: new Animated.ValueXY(),
    containerWidth: 0,
    currentSection: 0,
  };

  componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x }]),
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderRelease: (e, gesture) => {
        const { x } = this.findDroppedPosition(gesture);
        Animated.spring(this.state.pan, {
          toValue: { x, y: 0 },
          friction: 5,
        }).start();
      },
    });
  }

  findDroppedPosition = gesture => {
    const { containerWidth, currentSection } = this.state;
    const { options } = this.props;
    const sectionWidth = containerWidth / options.length;
    const isDraggedFarEnough = Math.abs(gesture.dx) >= sectionWidth / 2;
    const isMovedRight = gesture.dx >= 0;

    if (!isDraggedFarEnough || !this.isValidMovement(gesture)) {
      return { x: 0 };
    }

    const spacesMoved = this.findSpacesMoved(gesture);
    this.setState({
      currentSection: isMovedRight
        ? currentSection + spacesMoved
        : currentSection - spacesMoved,
    });
    return { x: sectionWidth * spacesMoved * (isMovedRight ? 1 : -1) };
  };

  findBoundaries = () => {
    const { containerWidth } = this.state;
    const { options } = this.props;
    const sectionWidth = containerWidth / options.length;
    const midpoint = sectionWidth / 2;

    return options
      .map((_, index) => {
        if (index === options.length - 1) {
          return null;
        }

        return sectionWidth * index + midpoint;
      })
      .filter(b => b);
  };

  findSpacesMoved = gesture => {
    const boundaries = this.findBoundaries();
    let spacesMoved = 0;
    boundaries.forEach((b, index) => {
      if (Math.abs(gesture.dx) >= b) {
        spacesMoved = index + 1;
      }
    });

    return spacesMoved;
  };

  isValidMovement = gesture => {
    const { currentSection } = this.state;
    const { options } = this.props;

    if (gesture.dx >= 0) {
      return currentSection + 1 <= options.length - 1;
    }

    return currentSection - 1 >= 0;
  };

  render() {
    const { theme, options } = this.props;
    const { containerWidth } = this.state;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    const sectionWidth = containerWidth / options.length;

    return (
      <View
        style={{
          backgroundColor: theme.grey2,
        }}
        onLayout={event => {
          this.setState({
            containerWidth: event.nativeEvent.layout.width,
          });
        }}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            panStyle,
            {
              width: sectionWidth,
              height: 50,
              backgroundColor: 'orange',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        />
        <View
          style={{
            width: containerWidth,
            justifyContent: 'space-around',
            flexDirection: 'row',
            position: 'absolute',
            paddingTop: 17,
          }}
          pointerEvents="box-none"
        >
          {options.map((option, index) => (
            <View
              key={option}
              pointerEvents={
                this.state.currentSection === index ? 'none' : 'auto'
              }
            >
              <TouchableOpacity onPress={() => console.log(index)}>
                <Text
                  style={{
                    color: theme.foreground,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}
                >
                  {option.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default withTheme(Toggle);
