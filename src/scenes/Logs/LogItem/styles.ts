import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayHorizontal: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 12,
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
})

export default styles
