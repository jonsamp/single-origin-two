import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 24 },
  card: { flexDirection: 'row' },
  iconContainer: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    height: 90,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
})

export default styles
