import {View, Text} from 'react-native';
import React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import styles from './styles';
import { COLORS } from '../../utils/helpers';

type PropType = {
  onPress: () => void;
  label: string;
  isFlat?: boolean;
  domainButton?: boolean;
};

const Button = ({onPress, label, isFlat , domainButton}: PropType) => {
  return (
    <PaperButton
      mode="contained"
      onPress={() => onPress()}
      style={domainButton ?  styles.button : isFlat ? [styles.flatButton,{backgroundColor:COLORS.primaryColor}] : [styles.button,{backgroundColor:COLORS.primaryColor}]}
      labelStyle={styles.label}>
      {label}
    </PaperButton>
  );
};

export default Button;
