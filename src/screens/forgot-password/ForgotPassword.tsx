import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import Input from '../../components/textInput/Input';
import {Controller, FieldErrors, useForm} from 'react-hook-form';
import Button from '../../components/button/Button';
import {ForgotPasswordScreenNavigationProp, forgotPasswordeRouteProp} from '../../types/navigationType';
import {COLORS, LOGO, customToast, getLocalStorageValue} from '../../utils/helpers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {checkUsernameExistApi} from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';

const logo = require('../../../assets/images/McDLogo.png');

type PropType = {
  navigation: ForgotPasswordScreenNavigationProp;
  route:forgotPasswordeRouteProp;
};

const ForgotPassword = ({navigation,route}: PropType) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm({defaultValues: {username: ''}});
  const username=route.params.username;
  const domain=route.params.DomainUrl;
  const {control, handleSubmit} = form;

  const onSubmit = (data: {username: string}) => {
    dispatch(checkUsernameExistApi({username: data.username}));
  };

  const onError = async (errors: FieldErrors<{username: string}>) => {
    customToast({type: 'error', text1: errors.username?.message});
  };
  const handleIconClick = async () => {
    navigation.navigate('login',{DomainUrl:domain,username:username});
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image  source={
                  LOGO.dynamicLogo
                    ? {uri: `data:image/png;base64,${LOGO.dynamicLogo}`}
                    : undefined
                } resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.form}>
        <Controller
          name="username"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              onChange={onChange}
              value={value}
              placeHolder={t('userOrEmail')}
              autoCapitalize={true}
              textColor='black'
            />
          )}
          rules={{
            required: {
              value: true,
              message: t('message.username'),
            },
          }}
        />

        <Button
          label={t('forgotpassword')}
          onPress={handleSubmit(onSubmit, onError)}
        />

        <Text
          style={[styles.link,{color:COLORS.primaryColor}]}
          onPress={handleIconClick}>
          {t('backToLogin')}
        </Text>
      </View>
    </View>
  );
};

export default ForgotPassword;
