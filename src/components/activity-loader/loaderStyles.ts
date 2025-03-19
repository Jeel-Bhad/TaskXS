import {StyleSheet} from 'react-native';

const loaderStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 150,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  modalStyles: {
    zIndex: 1100,
  },
  textStyles: {
    color: '#000',
    fontSize: 16,
  },
});

export default loaderStyles;
