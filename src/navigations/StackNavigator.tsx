import React, {useEffect, useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/Login';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import DrawerNavigator from './DrawerNavigator';
import {RootStackParamList} from '../types/navigationType';
import Loader from '../components/activity-loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {rootStateType} from '../types/reduxStateType';
import {COLORS, getLocalStorageValue} from '../utils/helpers';
import {authSliceActions} from '../redux/slices/authSlice';
import Notification from '../screens/notification/notification';
import {getSettings} from '../redux/slices/sharedSlice';
import {AppDispatch} from '../redux/store';
import Dashboard from '../screens/dashboard/dashboard';
import Subfolder from '../screens/subfolder/subfolder';
import { Text, TouchableOpacity, View } from 'react-native';
import Childsubfolder from '../screens/childsubfolder/childsubfolder';
import Document from '../screens/document/document';
import DashboardChat from '../screens/dashboardChat/dashboardChat';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { navigate } from './RootNavigation';
import Chatuserlist from '../screens/chatList/chatUserList';
import SignalR from '../screens/signalR/signalR';
import Task from '../screens/Task/task';
import Username from '../screens/Username/Username';
import Domain from '../screens/domainDropdown/Domain';
import ssoLogin from '../screens/ssoLogin/ssoLogin';
const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const color = useSelector((state: rootStateType) => state.shared.settingsData?.appSettingViewModel?.find((x:any)=>x.name=='SecondaryColor')?.value)
  const token = useSelector((state: rootStateType) => state.auth?.loginToken);
  const [isToken, setIsToken] = useState(token);
  const dispatch = useDispatch<AppDispatch>();
  const {t}=useTranslation();
  const getToken = async () => {
    const token = await getLocalStorageValue('token');
    dispatch(authSliceActions.setToken(token));
    setIsToken(token);
  };

  const fetchDomainAndSettings = async () => {
    const storedDomain = await getLocalStorageValue('Domain');
    dispatch(getSettings({ domain: storedDomain }));
  };

  useEffect(()=>{
    fetchDomainAndSettings();
  },[])

  useMemo(() => {
    getToken();
  }, [token]);

  const handleIconClick = () => {
    navigate('home','');
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: color ? color : COLORS.primaryColor
        }}>
        {isToken ? (
          <>
            <Stack.Screen
              name="home"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Notifications"
              component={Notification}
              options={{ headerShown: true, headerTitle: t('notification'),headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={color ? color : COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), }} />

            <Stack.Screen
              name="Task"
              component={Task}
              options={{ headerShown: true, headerTitle: t('tasks'),headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), }} />
            <Stack.Screen
              name="DashboardChat"
              component={DashboardChat}
              options={{ headerShown: true, headerTitle: t('dashboardChat'),headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ),   }} />

            <Stack.Screen
              name='Dashboard'
              component={Dashboard}
              options={{ headerShown: true, headerTitle: t('dashboard'),headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), 
              }} />

            <Stack.Screen
              name='Subfolder'
              component={Subfolder}
              options={{ headerShown: true,headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), }} />

            <Stack.Screen
              name='Childsubfolder'
              component={Childsubfolder}
              options={{ headerShown: true,headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
            ), }} />

            <Stack.Screen
              name='Document'
              component={Document}
              options={{ headerShown: true,headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), }} />

            <Stack.Screen
              name='Chatuserlist'
              component={Chatuserlist}
              options={{ headerShown: true, headerTitle: t('chat_noti'),headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), }} />

            <Stack.Screen
              name='SignalR'
              component={SignalR}
              options={{ headerShown: true,headerStatusBarHeight:0,
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <TouchableOpacity onPress={handleIconClick}>
                  <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={COLORS.primaryColor}
                    style={{marginRight: 10}}
                  />
                  </TouchableOpacity>
                </View>
              ), }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Username"
              component={Username}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Domain"
              component={Domain}
              options={{headerShown: true,headerTitle:""}}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{headerShown: true,headerTitle:""}}
            />
            <Stack.Screen
              name="ssoLogin"
              component={ssoLogin}
              options={{headerShown: true,headerTitle:""}}
            />
            <Stack.Screen
              name="forgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <Loader />
    </>
  );
};

export default StackNavigator;
