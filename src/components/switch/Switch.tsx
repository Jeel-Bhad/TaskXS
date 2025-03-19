import {View, Text} from 'react-native';
import React from 'react';
import {Switch as PaperSwitch} from 'react-native-paper';
import styles from './switchStyles';
import { COLORS } from '../../utils/helpers';
type propType = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

const Switch = ({value, onChange, label}: propType) => {
  const toggleChange = () => {
    onChange(!value);
  };

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{label}</Text>
      <PaperSwitch value={value} onChange={toggleChange} color={COLORS.primaryColor} />
    </View>
  );
};

export default Switch;
