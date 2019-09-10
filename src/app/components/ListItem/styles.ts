import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 24 },
  card: { flexDirection: 'row' },
  iconContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    height: 90,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.8,
  },
})

export default styles
