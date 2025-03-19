import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  projectContainer: {
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
  },
  buildingName: {
    marginTop: 20,
    marginBottom: 20,
    paddingStart: 5,
  },
  textContainer: {
    flexWrap: 'wrap',
    width: '80%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  textStyleBname: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  textStyle: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
  },
  col1: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 10,
    gap: 8,
  },
  col2:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-start',
    paddingHorizontal:10,
  },
  buildingList: {
    marginBottom: 20,
    marginHorizontal: 15,
    gap: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flex: 1,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 15,
    borderColor: '#004413',
    top: 2,
  },
});
export default styles;
