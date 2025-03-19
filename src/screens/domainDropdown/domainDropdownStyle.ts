import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  scrollView: {flexGrow: 1},
  content: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: 200,
    width: null,
  },
});

export default styles;
