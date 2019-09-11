import { StyleSheet } from 'react-native'
import { width } from '../../constants/layout'
import type from '../../constants/type'

export default StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  cardContainer: {
    // half screen width, subtract margin, subtract scroll view padding
    width: width * 0.5 - 16 - 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0,
  },
  cardValue: {
    ...type.header,
    marginBottom: 8,
  },
  cardLabel: type.body,
})
