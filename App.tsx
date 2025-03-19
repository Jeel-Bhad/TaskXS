/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import notifee from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from './src/navigations/StackNavigator';
import Toast, {ErrorToast, ToastConfig} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {PermissionsAndroid,Platform} from 'react-native';
import {   requestUserPermission, requestUserPermissionIOS } from './src/utils/notificationService';
import { navigationRef,  } from './src/navigations/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);

    setProjectListUptoDate();

   if(Platform.OS == 'android'){
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res)=>{
      if(!!res && res == 'granted' || res == 'never_ask_again'){
        requestUserPermission();
      }
    }).catch((err)=>{
      console.log(err)
    });
   }else if(Platform.OS == 'ios'){
    console.log("inside ios");
    requestUserPermissionIOS();
     notifee.setBadgeCount(0);
   }
  }, []);

  const setProjectListUptoDate = async () => {
    await AsyncStorage.removeItem('projectId');
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <PaperProvider>
          <ActionSheetProvider useCustomActionSheet={true}>
            <SafeAreaView style={styles.safeAreaStyles}>
              <StackNavigator />
            </SafeAreaView>
          </ActionSheetProvider>
        </PaperProvider>
      </NavigationContainer>
      <Toast position="bottom" config={toastConfig} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
  },
});

export default App;

const toastConfig: ToastConfig = {
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={5} />,
};
