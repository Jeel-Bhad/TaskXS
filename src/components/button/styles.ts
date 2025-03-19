import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/helpers';

const styles = StyleSheet.create({
  button: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor:"#030000",
    color:"white"
  },
  flatButton: {
    height: 40,
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor:COLORS.primaryColor
  },
  label: {
    textTransform: 'uppercase',
    color:"white"
  },
});

export default styles;
