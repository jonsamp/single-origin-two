import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import withTheme from 'providers/theme';
import type from 'constants/type';
import HeaderScrollView from 'react-native-header-scroll-view';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Logs extends Component {
  static propTypes = {};

  state = {};

  render() {
    const { theme } = this.props;
    return (
      <HeaderScrollView title="For You">
        <Text style={[type.body, { padding: 16 }]}>
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
          Between them and the beasts behind me there was little choice, but at
          least there was a doubt as to the reception these grotesque parodies
          on humanity would accord me, while there was none as to the fate which
          awaited me beneath the grinning fangs of my fierce pursuers. And so I
          raced on toward the trees intending to pass beneath that which held
          the man-things and take refuge in another farther on; but the
          wolf-dogs were very close behind me—so close that I had despaired of
          escaping them, when one of the creatures in the tree above swung down
        </Text>
      </HeaderScrollView>
    );
  }
}

export default withTheme(Logs);
