import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },

  avatarContainer: {
    alignSelf: 'center',
    marginTop: -60,
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cameraIcon: {
    marginTop: -40,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    gap: 25,
  },
  notificationContainer: {
    padding: 20,
    gap: 30,
  },
  notificationHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
export default styles;
