import React, {useState} from 'react';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash, faImage, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {Text,TouchableOpacity,View} from 'react-native';
type PropType = {
  placeHolder: string;
  onChange: (text ?: string | undefined)=> void;
  value: string;
  autoCapitalize?: boolean;
  right?: boolean;
  isFlat?: boolean;
  readOnlyInput?:boolean;
  disabled?: boolean;
  notRequired?: boolean;
  fromChat?:boolean;
  imgChatButton?:boolean;
  textColor:string;
  isNumericKeyboard?: boolean;
  onChatIconPress?: () => void; 
  onImgIconPress?: () => void;
};

const Input = ({
  placeHolder,
  onChange,
  value,
  autoCapitalize,
  right,
  isFlat,
  readOnlyInput,
  disabled,
  notRequired,
  fromChat,
  isNumericKeyboard,
  imgChatButton,
  textColor,
  onChatIconPress, // Pass the prop to the component
  onImgIconPress,
}: PropType) => {
  const [showPassword, setShowPassword] = useState(false);
  const renderRightIcon = () => {
    if (imgChatButton) {
      return (
        <TextInput.Icon
            icon={() => (
              // Replace the icon with your chat icon
              <View style={{flexDirection:'row',alignItems: 'center', width: '100%',borderRadius: 0,height:'100%'}}>
                <TouchableOpacity onPress={onImgIconPress}>
                  <FontAwesomeIcon icon={faImage} size={17} style={{marginRight:7}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onChatIconPress} >
                  <FontAwesomeIcon icon={faPaperPlane} size={17}  />
                </TouchableOpacity>
              </View>
            )}
          />
      );
    }  else if (right) {
      return (
        <TextInput.Icon
          icon={() => (
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          )}
          onPress={() => setShowPassword((prev) => !prev)}
        />
      );
    }
  };
  return (
    <TextInput
      value={value}
      mode={isFlat ? 'flat' : 'outlined'}
      onChangeText={onChange}
      outlineStyle={fromChat ?styles.chatInput:styles.outline}
      style={isFlat ? styles.flatInput : styles.input}
      cursorColor="#000"
      label={
        isFlat ? (
          <Text>
            {placeHolder}
            {!notRequired && <Text style={styles.required}> *</Text>}
          </Text>
        ) : (
          placeHolder
        )
      }
      disabled={disabled}
      keyboardType={isNumericKeyboard ? 'number-pad' : 'default'}
      theme={{colors: {primary: '#000'}}}
      placeholderTextColor='black'
      autoCapitalize={autoCapitalize ? 'none' : undefined}
      secureTextEntry={right ? !showPassword : false}
      right={renderRightIcon()}
      readOnly={readOnlyInput ? true : false}
      textColor={textColor}
    />
  );
};

export default Input;
