import { StyleSheet } from 'react-native'
import type from '../../constants/type'

export default StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 16,
    width: '100%',
    padding: 16,
  },
  cardContainer: {
    width: '45%',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowOpacity: 0,
  },
  cardValue: {
    ...type.header,
    marginBottom: 8,
  },
  cardLabel: {
    ...type.body,
  },
})