import React from 'react';
import {Dropdown as DropdownElement} from 'react-native-element-dropdown';
import styles from './styles';
import {View} from 'react-native';
type PropType = {
  data: {title: string; value: string}[];
  onChange: (value: string) => void;
  value: string;
  placeHolder: string;
  isFlat?: boolean;
  drawerDp?:boolean;
  position?:'auto' | 'top' | 'bottom'; 
};

const Dropdown = (props: PropType) => {
  return (
    <DropdownElement
      style={[props.isFlat ? styles.profileDropDown : (props.drawerDp?styles.drawerDropDown:styles.loginDropdown)]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      containerStyle={styles.dropDownContainerStyle}
      data={props.data}
      placeholder={props.placeHolder}
      labelField="title"
      valueField="value"
      onChange={language => props.onChange(language.value)}
      value={props.value}
      mode="default"
      dropdownPosition={props.position}
      itemTextStyle={styles.textStyle}
    />
  );
};

export default Dropdown;
