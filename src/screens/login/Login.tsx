import {View, Text, Image, Platform, ScrollView,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/textInput/Input';
import Button from '../../components/button/Button';
import {useForm, Controller, FieldErrors} from 'react-hook-form';
import { useState } from 'react';
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import {
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from '../../types/navigationType';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {COLORS, customToast, getLocalStorageValue, languageList} from '../../utils/helpers';
import {loginApi} from '../../redux/slices/authSlice';
import {rootStateType} from '../../types/reduxStateType';
import { getSettings, setCurrentSelectedLanguage, sharedSliceAction } from '../../redux/slices/sharedSlice';
import { useIsFocused } from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { navigate } from '../../navigations/RootNavigation';
import { getToken } from '../../utils/notificationService';
// const logo = require('../../../assets/images/TaskXS_Logo.png');

type PropType = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const Login = ({navigation, route}: PropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const domain=route.params.DomainUrl;
  const username=route.params.username;
  const [fireToken, setToken] = useState<null|string|undefined>('');
  const [DomainFromStore, setDomain] = useState<null|string|undefined>('');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const dynamicLogoUrl = useSelector(
    (state: rootStateType) =>
      state?.shared?.settingsData?.brandingViewModel?.imageFile,
  );
  const form = useForm({
    defaultValues: {domain: '',username: '', password: '', language: 'english'},
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  const fetchData =async ()=>{ 
    const firebaseToken = await getLocalStorageValue('firebaseToken');
    setToken(firebaseToken);
  }
  const fetchDomainAndSettings = async () => {
    const storedDomain = await getLocalStorageValue('Domain');
    setDomain(storedDomain);
    dispatch(getSettings({ domain: storedDomain }));
  };
  useEffect(() => {
    fetchData();
    fetchDomainAndSettings();
  }, [isFocused]);

  const onSubmit = async (data: {
    domain:string;
    username: string;
    password: string;
    language: string;
  }) => {
    const formData = {
      email: username,
      password: data.password,
      isIOS: Platform.OS === 'ios',
      isMobile: true,
      domainUrl: DomainFromStore ?? '',
      isAgent: false,
      deviceId: fireToken,
    };
    dispatch(loginApi({formData,t:t}));
    await getToken()
  };

  const onError = (
    errors: FieldErrors<{domain: string; username: string; language: string; password: string}>,
  ) => {
    customToast({
      type: 'error',
      text1: (errors.domain || errors.username || errors.password)?.message,
    });
  };

  const handleChangeLanguage = (value:string) => {
    setSelectedLanguage(value);
    dispatch(setCurrentSelectedLanguage(value)); // Update selected language in Redux
    i18n.changeLanguage(value); // Change the language using i18n
  };

  const handleIconClick = async () => {
    navigate('forgotPassword',{DomainUrl:domain,username:username});
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
       keyboardShouldPersistTaps="always">
      <View style={styles.container}>
          <View style={styles.dropDownContainer}>
            <Controller
              name="language"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  data={languageList}
                  onChange={handleChangeLanguage}
                  value={selectedLanguage}
                  placeHolder="Language"              
                />
              )}
            />
          </View>      
        <Image
          source={
            dynamicLogoUrl
              ? {uri: `data:image/png;base64,${dynamicLogoUrl}`}
              : undefined
          }
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.inputContainer}>
        <Controller
            name="domain"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeHolder={t('domain')}
                onChange={onChange}
                value={domain}
                autoCapitalize={true}
                readOnlyInput={true}
                textColor='grey'
              />
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeHolder={t('username')}
                onChange={onChange}
                value={username}
                autoCapitalize={true}
                readOnlyInput={true}
                textColor='grey'
                
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeHolder={t('password')}
                onChange={onChange}
                value={value}
                right={true}
                textColor='black'
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('message.password'),
              },
            }}
          />
          <Text
            style={[styles.link,{color:COLORS.primaryColor}]}
            onPress={handleIconClick}>
            {t('forgotpassword')}
          </Text>
          <Button onPress={handleSubmit(onSubmit, onError)} label={t('login')} />
        </View>
      </View>
     </ScrollView>
  );
};

export default Login;
