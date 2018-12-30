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
import styles from './styles';

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
    const { pan } = this.state;
    this.val = { x: 0, y: 0 };
    pan.addListener(value => (this.val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }]),
      onPanResponderGrant: () => this.resetCurrentPan(),
      onPanResponderRelease: (e, gesture) => {
        const { x } = this.findDroppedPosition(gesture);
        this.animateToPosition({ x });
      },
    });
  }

  getSectionWidth = () => {
    const { containerWidth } = this.state;
    const { options } = this.props;
    return containerWidth / options.length;
  };

  setCurrentSection = ({ index }) => {
    // TODO: new section selected
    this.setState({ currentSection: index });
  };

  animateToPosition = ({ x }) => {
    Animated.spring(this.state.pan, {
      toValue: { x, y: 0 },
      friction: 5,
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
    const { currentSection } = this.state;
    const sectionWidth = this.getSectionWidth();
    const isDraggedFarEnough = Math.abs(gesture.dx) >= sectionWidth / 2;
    const isMovedRight = gesture.dx >= 0;

    if (!isDraggedFarEnough || !this.isValidMovement(gesture)) {
      return { x: 0 };
    }

    const spacesMoved = this.findSpacesMoved(gesture);
    this.setCurrentSection({
      index: isMovedRight
        ? currentSection + spacesMoved
        : currentSection - spacesMoved,
    });
    console.log({
      sectionIndex: isMovedRight
        ? currentSection + spacesMoved
        : currentSection - spacesMoved,
      draggedTO: sectionWidth * spacesMoved * (isMovedRight ? 1 : -1),
    });
    return { x: sectionWidth * spacesMoved * (isMovedRight ? 1 : -1) };
  };

  findBoundaries = () => {
    const { options } = this.props;
    const sectionWidth = this.getSectionWidth();
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

  handleToggleTapped = index => {
    const { currentSection } = this.state;
    const sectionWidth = this.getSectionWidth();
    const spacesToMove = index - currentSection;
    const nextSectionIndex = spacesToMove + currentSection;
    const moveToX = sectionWidth * spacesToMove;

    this.resetCurrentPan();
    this.setCurrentSection({ index: nextSectionIndex });
    this.animateToPosition({ x: moveToX });
  };

  render() {
    const { theme, options } = this.props;
    const { containerWidth, pan } = this.state;

    return (
      <View
        style={{
          backgroundColor: theme.grey2,
        }}
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
              width: this.getSectionWidth(),
              backgroundColor: theme.primary,
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
                this.state.currentSection === index ? 'none' : 'auto'
              }
              style={styles.labelButtonContainer}
            >
              <TouchableOpacity
                onPress={() => this.handleToggleTapped(index)}
                style={styles.labelButton}
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
    );
  }
}

export default withTheme(Toggle);
