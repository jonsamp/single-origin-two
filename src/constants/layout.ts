import { Dimensions } from 'react-native'
import { styleguide } from './themes'

const { width, height } = Dimensions.get('window')
const isMaxWidth = width >= styleguide.maxWidth

export { width, height, isMaxWidth }
