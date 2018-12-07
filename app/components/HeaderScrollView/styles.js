import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import type from 'constants/type';

const headerHeight = ifIphoneX(88, 60);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  headerContainer: {
    height: headerHeight,
  },
  headerComponentContainer: {
    height: headerHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
  },
  headerTitle: {
    ...type.largeTitle,
    marginLeft: 16,
  },
});

export default styles;
