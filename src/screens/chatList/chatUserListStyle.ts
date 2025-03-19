import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  singleUserContainer: {
    margin: 8,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  picColumn: {
    flex: 0,
    alignItems:'flex-start'
  },
  nameColumn: {
    flex: 2,
    alignItems:'center',
  },
  arrowColumn: {
    flex: 1,
    justifyContent:'center',
  },
  folderName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
})
export default styles;
