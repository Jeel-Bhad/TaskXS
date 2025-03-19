import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/helpers';
const styles = StyleSheet.create({
  loginDropdown: {
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 30,
    marginBottom: 30,
  },
  profileDropDown: {
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  dropDownContainerStyle: {
    borderRadius: 5,
    height: 250,
  },
  drawerDropDown: {
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    marginBottom: 5,    
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#000',
    marginLeft: 6,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#000',
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: '#000',
  },
  textStyle:{
    color:'black'
  }
});

export default styles;
