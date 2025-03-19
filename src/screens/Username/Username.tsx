import {Image, View ,ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Button from '../../components/button/Button';
import {DomainScreenNavigationProp} from '../../types/navigationType';
import {Controller, FieldErrors, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {domainListApi} from '../../redux/slices/authSlice';
import {customToast} from '../../utils/helpers';
import Input from '../../components/textInput/Input';

const logo = require('../../../assets/images/newXsLogo.jpeg');

type PropType = {
  navigation: DomainScreenNavigationProp;
};

const Username = ({navigation}: PropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm({defaultValues: {username: ''}});
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;
  
  const onSubmit = async (data: {username: string}) => {   
    dispatch(domainListApi({username:data.username,navigation})) ;
  };

  const onError = (errors: FieldErrors<{domain: string}>) => {
    customToast({type: 'error', text1: "Please enter username"});
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
       keyboardShouldPersistTaps="always">
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.imageStyle} resizeMode="contain" />
          <Controller
          name="username"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
            placeHolder="Username" onChange={onChange} value={value} 
            textColor='black'/>
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter username',
            },
          }}
        />
      
        <Button domainButton onPress={handleSubmit(onSubmit, onError)}  label="next" />
      </View>
    </View>
    </ScrollView>
  );
};

export default Username;
