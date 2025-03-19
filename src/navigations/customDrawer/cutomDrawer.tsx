/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styles from '../customDrawer/cutomDrawerStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {authSliceActions} from '../../redux/slices/authSlice';
import {rootStateType} from '../../types/reduxStateType';
import { COLORS, LOGO, languageList } from '../../utils/helpers';
import Dropdown from '../../components/dropdown/Dropdown';
// const logo = require('../../../assets/images/TaskXS_Logo.png');
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import { setCurrentSelectedLanguage } from '../../redux/slices/sharedSlice';
import notifee from '@notifee/react-native';
const CustomDrawer = (props: any) => {
  const { t } = useTranslation();
  const selectedLanguage = useSelector((state: rootStateType)=> state?.shared.currentSelectedLanguage);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(
    (state: rootStateType) => state.auth?.loginRes?.data.email,
  );

  const handlePress = async () => {
    await AsyncStorage.removeItem('token');
    await notifee.setBadgeCount(0);
    await AsyncStorage.removeItem('projectId');
    dispatch(authSliceActions.logout());
  };

  const handleChangeLanguage = (value:string) => {
    dispatch(setCurrentSelectedLanguage(value)); // Update selected language in Redux
    i18n.changeLanguage(value); // Change the language using i18n
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.imageContainer}>
          <ImageBackground style={styles.imageBackground}>
            <View style={styles.imageCenter}>
              <Image
                source={
                  LOGO.dynamicLogo
                    ? {uri: `data:image/png;base64,${LOGO.dynamicLogo}`}
                    : undefined
                }
                style={styles.image}
              />
              {/* <Text style={styles.userName}>jaanmartenkops@gmail.com</Text> */}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Dropdown
                data={languageList}
                onChange={handleChangeLanguage}
                value={selectedLanguage}
                placeHolder="Language"
                position='top'
                drawerDp
              />
      <TouchableOpacity style={[styles.logoutButton,{backgroundColor:COLORS.primaryColor}]} onPress={handlePress}>
        <Text style={styles.logoutButtonText}>{t('logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;
