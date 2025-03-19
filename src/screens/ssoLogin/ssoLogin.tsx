import {View, Text, Image, Platform, ScrollView,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import styles from './ssoLoginStyle';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import {useForm, Controller, FieldErrors} from 'react-hook-form';
import { useState } from 'react';
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import {
  ssoLoginScreenRouteProp,
} from '../../types/navigationType';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {getLocalStorageValue, languageList} from '../../utils/helpers';
import {AzureAppLoginApi} from '../../redux/slices/authSlice';
import {rootStateType} from '../../types/reduxStateType';
import { getSettings, setCurrentSelectedLanguage, sharedSliceAction } from '../../redux/slices/sharedSlice';
import { useIsFocused } from '@react-navigation/native';

import { authorize } from 'react-native-app-auth';  

type PropType = {
  route: ssoLoginScreenRouteProp;
};

const SsoLogin = ({ route}: PropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const username=route.params.username;
  const clientId=route.params.clientId;
  const tenantId=route.params.tenantId;
  
  const [fireToken, setToken] = useState<null|string|undefined>('');
  const [DomainFromStore, setDomain] = useState<null|string|undefined>('');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const config = {   
    issuer: `https://login.microsoftonline.com/${tenantId}`,   
    clientId: clientId,   
    redirectUrl: 'taskxs://auth/',   
    scopes: ['openid', 'profile', 'email'],   
    serviceConfiguration: {     
      authorizationEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,     
      tokenEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,   }, 
    };  
  const dynamicLogoUrl = useSelector(
    (state: rootStateType) =>
      state?.shared?.settingsData?.brandingViewModel?.imageFile,
  );
  const form = useForm({
    defaultValues: {domain: '',username: '', password: '', language: 'english'},
  });
  const {
    control,
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
    console.log(username)
  }, [isFocused]);


  const handleChangeLanguage = (value:string) => {
    setSelectedLanguage(value);
    dispatch(setCurrentSelectedLanguage(value)); // Update selected language in Redux
    i18n.changeLanguage(value); // Change the language using i18n
  };

  const handleClick = async () => {
    console.log('clicked');
    try {     
      const result = await authorize({...config,additionalParameters:{login_hint:username}}); 
      console.log('Authorization Result:', result);
      if(result){
        dispatch(AzureAppLoginApi({isIOS:Platform.OS === 'ios',deviceId:fireToken,
        domainUrl: DomainFromStore ?? '',isAgent:false,isMobile:true,requestBody:result.idToken}));
      }
    } catch (error) {     
      console.log('Authorization Error:', error);   
    } 
  }

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
          <Button onPress={()=>handleClick()} label={t('sso')} />
        </View>
      </View>
     </ScrollView>
  );
};

export default SsoLogin;
