import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from './changePasswordStyles';
import {Controller, FieldErrors, useForm} from 'react-hook-form';
import Input from '../../components/textInput/Input';
import Button from '../../components/button/Button';
import {customToast, getLocalStorageValue} from '../../utils/helpers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {changePassword} from '../../redux/slices/authSlice';
import {ChangePasswordScreenNavigationProp} from '../../types/navigationType';
import {projectListApi} from '../../redux/slices/projectSlice';
import {ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';

type FieldInput = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type propType = {
  navigation: ChangePasswordScreenNavigationProp;
};

const ChangePassword = ({navigation}: propType) => {
  const dispatch = useDispatch<AppDispatch>();
  const {t} = useTranslation();
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const {handleSubmit, control, reset} = form;

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const id = await getLocalStorageValue('id');
    const formData = {userId: id ? Number(id) : 0, ...data};

    dispatch(changePassword(formData));
  };

  const onError = async (errors: FieldErrors<FieldInput>) => {
    customToast({
      type: 'error',
      text1: (
        errors.oldPassword ||
        errors.newPassword ||
        errors.confirmPassword
      )?.message,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      reset();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Controller
            name="oldPassword"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                placeHolder={t('oldpass')}
                onChange={onChange}
                value={value}
                isFlat
                right
                textColor='black'
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('message.password'),
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  t('message.validpass')
              },
            }}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                placeHolder={t('newpass')}
                onChange={onChange}
                value={value}
                textColor='black'
                isFlat
                right
              />
            )}
            rules={{
              required: {
                value: true,
                message:  t('message.password'),
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  t('message.validpass')
              },
            }}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                placeHolder={t('confirmpass')}
                onChange={onChange}
                value={value}
                textColor='black'
                isFlat
                right
              />
            )}
            rules={{
              required: {
                value: true,
                message:  t('message.password'),
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  t('message.validpass')
              },
            }}
          />

          <Button
            onPress={handleSubmit(onSubmit, onError)}
            label={t('save')}
            isFlat
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
