import React from 'react'
import PropTypes from 'prop-types'
import { Svg } from 'expo'
import { connect } from 'react-redux'
import { selectSettings } from '@app/state/settings/selectors'
import themes from '@app/constants/themes'

const mapStateToProps = state => ({
  theme: selectSettings(state).theme,
})

const propTypes = {
  focused: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
}

const LogsIcon = ({ focused, theme }) => (
  <Svg width="28" height="27">
    <Svg.G
      fill={focused ? themes[theme].primary : themes[theme].foreground}
      fillRule="nonzero"
    >
      <Svg.Path d="M10.568 8.21a1 1 0 1 1 0-2h7.245a1 1 0 0 1 0 2h-7.245zM6.437 18.23a1 1 0 0 1 0-2h15.017a1 1 0 1 1 0 2H6.437zM6.594 14.397a1 1 0 1 1 0-2H21.48a1 1 0 1 1 0 2H6.594z" />
      <Svg.Path d="M4.537 2.316a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h19a2 2 0 0 0 2-2v-18a2 2 0 0 0-2-2h-19zm0-2h19a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4h-19a4 4 0 0 1-4-4v-18a4 4 0 0 1 4-4z" />
    </Svg.G>
  </Svg>
)

LogsIcon.propTypes = propTypes

export default connect(mapStateToProps)(LogsIcon)