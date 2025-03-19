import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  leftContainer:{
   flex:1,
   alignItems:'flex-start',
  },
  rightContainer:{
    flex:1,
    alignItems:'flex-end',
  },
  containerCommon: {
    alignItems:'center',
    maxWidth:'90%',
    minWidth:'20%',
    padding: 16,
    margin: 8,
    width:'auto'
  },
  leftBubble: {
    backgroundColor: '#d9f1f1',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    borderTopRightRadius:30,
  },
  rightBubble: {
    backgroundColor: '#0d6218',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    borderTopLeftRadius:30,
  },
  leftMessageText: {
    color:'#333',
    fontSize: 16,
  },
  rightMessageText: {
    color:'white',
    fontSize: 16,
  },
  dateUsername: {
    left:10,
    color:'#333',
    fontSize: 13,
  },
  rightdateUsername:{
    right:10,
    color:'#333',
    fontSize: 13,
  }
});
export default styles;
