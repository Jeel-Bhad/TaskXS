import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  singleNotiContainer: {
    margin: 6,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
    padding: 25,
  },
  folderName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  normalText: {
    color: '#000'
  },
  row: {
    flexDirection:'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  col1: {
    width:'20%',
    justifyContent:'space-around',
  },
  col2:{
    width:'80%',
    justifyContent: 'space-around',
  }
});
export default styles;
