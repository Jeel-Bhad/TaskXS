import React, { useEffect } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Project from '../screens/project/project';
import Profile from '../screens/profile/profile';
import CustomDrawer from './customDrawer/cutomDrawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faSearch,
  faKey,
  faBell,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import ChangePassword from '../screens/changePassword/changePassword';
import { useDispatch, useSelector } from 'react-redux';
import { rootStateType } from '../types/reduxStateType';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../utils/helpers';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const color = useSelector((state: rootStateType) => state.shared.settingsData?.appSettingViewModel?.find((x:any)=>x.name=='SecondaryColor')?.value)
  const {t}=useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: color ? color :COLORS.primaryColor,
        drawerLabelStyle: {marginLeft: -15},
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor:  color ? color :COLORS.primaryColor,
        headerStatusBarHeight:0
      }}>
      <Drawer.Screen
        name={t('project')}
        component={Project}
        options={{
          drawerIcon: () => (
            <FontAwesomeIcon icon={faHome} size={20} color={ color ? color :COLORS.primaryColor} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('profile')}
        component={Profile}
        options={{
          drawerIcon: () => (
            <FontAwesomeIcon icon={faUser} size={20} color={ color ? color : COLORS.primaryColor} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('changepass')}
        component={ChangePassword}
        options={{
          drawerIcon: () => (
            <FontAwesomeIcon icon={faKey} size={20} color={ color ? color : COLORS.primaryColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
