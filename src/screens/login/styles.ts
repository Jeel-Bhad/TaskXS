import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {flexGrow: 1},
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: 195,
    alignSelf: 'center',
  },
  dropDownContainer: {
    width: 150,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    marginTop: 20,
    gap: 10,
  },
  link: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: '700',
  },
});

export default styles;
