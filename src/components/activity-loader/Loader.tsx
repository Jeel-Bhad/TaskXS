import {View, Text, Modal} from 'react-native';
import React from 'react';
import loaderStyles from './loaderStyles';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {rootStateType} from '../../types/reduxStateType';

const Loader = () => {
  const isLoading = useSelector((state: rootStateType) => state.shared.loading);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}
      style={loaderStyles.modalStyles}
      onRequestClose={() => {}}>
      <View style={loaderStyles.modalBackground}>
        <View style={loaderStyles.activityIndicatorWrapper}>
          <ActivityIndicator color="black" />
          <Text style={loaderStyles.textStyles}>Please wait...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
