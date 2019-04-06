import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { Haptic } from 'expo';
import withTheme from '@app/providers/theme';
import styles from './styles';

class DraggableSegment extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onStartMove: PropTypes.func,
    onStopMove: PropTypes.func,
    isDarkTheme: PropTypes.bool,
  };

  static defaultProps = {
    onStartMove: () => {},
    onStopMove: () => {},
  };

  state = {
    pan: new Animated.ValueXY(),
    containerWidth: 0,
    currentSegmentIndex: 0,
  };

  componentWillMount() {
    const { pan } = this.state;
    this.val = { x: 0, y: 0 };

    pan.addListener(value => {
      this.val = value;
      return null;
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }]),
      onPanResponderGrant: () => {
        this.toggleStartedMoving();
        this.resetCurrentPan();
      },
      onPanResponderRelease: (e, gesture) => {
        const { x } = this.findDroppedPosition(gesture);
        this.animateToPosition({ x });
      },
    });
  }

  getSegmentWidth = () => {
    const { containerWidth } = this.state;
    const { options } = this.props;
    return containerWidth / options.length;
  };

  setCurrentSegmentIndex = ({ index }) => {
    Haptic.selection();
    this.setState({ currentSegmentIndex: index });
    this.props.onChange(index);
  };

  animateToPosition = ({ x }) => {
    Animated.timing(this.state.pan, {
      toValue: { x, y: 0 },
      duration: 400,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  resetCurrentPan = () => {
    const { pan } = this.state;
    pan.setOffset({
      x: this.val.x,
      y: this.val.y,
    });
    pan.setValue({ x: 0, y: 0 });
  };

  findDroppedPosition = gesture => {
    const { currentSegmentIndex } = this.state;
    const segmentWidth = this.getSegmentWidth();
    const isDraggedFarEnough = Math.abs(gesture.dx) >= segmentWidth / 2;
    const isMovedRight = gesture.dx >= 0;

    this.toggleStoppedMoving();

    if (!isDraggedFarEnough || !this.isValidMovement(gesture)) {
      return { x: 0 };
    }

    const spacesMoved = this.findSpacesMoved(gesture);
    this.setCurrentSegmentIndex({
      index: isMovedRight
        ? currentSegmentIndex + spacesMoved
        : currentSegmentIndex - spacesMoved,
    });
    return { x: segmentWidth * spacesMoved * (isMovedRight ? 1 : -1) };
  };

  findBoundaries = () => {
    const { options } = this.props;
    const segmentWidth = this.getSegmentWidth();
    const midpoint = segmentWidth / 2;

    return options
      .map((_, index) => {
        if (index === options.length - 1) {
          return null;
        }

        return segmentWidth * index + midpoint;
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
    const { currentSegmentIndex } = this.state;
    const { options } = this.props;

    if (gesture.dx >= 0) {
      return currentSegmentIndex + 1 <= options.length - 1;
    }

    return currentSegmentIndex - 1 >= 0;
  };

  handleSegmentTapped = index => {
    const { currentSegmentIndex } = this.state;
    const segmentWidth = this.getSegmentWidth();
    const segmentsToMove = index - currentSegmentIndex;
    const nextSegmentIndex = segmentsToMove + currentSegmentIndex;

    this.toggleStartedMoving();
    this.resetCurrentPan();
    this.setCurrentSegmentIndex({ index: nextSegmentIndex });
    this.animateToPosition({ x: segmentWidth * segmentsToMove });
    this.toggleStoppedMoving();
  };

  toggleStartedMoving = () => {
    this.props.onStartMove();
  };

  toggleStoppedMoving = () => {
    setTimeout(this.props.onStopMove, 400);
  };

  render() {
    const { theme, options, isDarkTheme } = this.props;
    const { containerWidth, pan } = this.state;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.grey2, borderBottomColor: theme.background },
        ]}
      >
        <View
          onLayout={event =>
            this.setState({
              containerWidth: event.nativeEvent.layout.width,
            })
          }
        >
          <Animated.View
            style={[
              styles.toggleContainer,
              {
                width: this.getSegmentWidth(),
                backgroundColor: isDarkTheme ? theme.grey1 : theme.background,
                transform: pan.getTranslateTransform(),
              },
            ]}
            {...this.panResponder.panHandlers}
          />
          <View
            style={[
              styles.labelContainer,
              {
                width: containerWidth,
              },
            ]}
            pointerEvents="box-none"
          >
            {options.map((option, index) => (
              <View
                key={option}
                pointerEvents={
                  this.state.currentSegmentIndex === index ? 'none' : 'auto'
                }
                style={styles.labelButtonContainer}
              >
                <TouchableOpacity
                  onPress={() => this.handleSegmentTapped(index)}
                  style={styles.labelButton}
                  activeOpacity={1}
                >
                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: theme.foreground,
                      },
                    ]}
                  >
                    {option.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(DraggableSegment);
