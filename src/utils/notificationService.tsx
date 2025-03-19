import messaging from '@react-native-firebase/messaging';
import { setLocalStorageValue } from './helpers';
import { navigate } from '../navigations/RootNavigation';
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    }
};

export const requestUserPermissionIOS = async () => {
  const authStatus = await messaging().requestPermission();
  setTimeout(async () => {
  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    await getToken();
  } else {
    console.log("Notification permission denied.");
  }
}, 500);
};

export const getToken = async() =>{
  try{
      const token = await messaging().getToken().then(async (token) => {
        console.log("token -- "+token);
        token && await setLocalStorageValue({field: 'firebaseToken', data: token});
      });
  }catch{
      console.log("Error getting token");
  }
}  

export async function notificationListner() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Forground : A new FCM message arrived!', remoteMessage);
      });
  
      messaging().onNotificationOpenedApp( remoteMessage => {
        console.log('tap : Notification from background state:',remoteMessage);
        // You can handle the notification here, for example, navigate to a specific screen based on the notification data
        const fireData=remoteMessage.data
        if(!!fireData?.ispage && typeof fireData?.ispage === 'string' && fireData.ispage.toLocaleLowerCase() == "chat" )
          {
            navigate('SignalR',{
                isGroup: fireData?.isgroup=='true' ? (fireData.isgroup):false,
                receiverId: typeof fireData?.senderId === 'string' ? parseInt(fireData.senderId) : 0,
                userName: fireData?.isgroup ?fireData.buildingName:fireData?.sendername,
                groupId:fireData?.isgroup=='true'? typeof fireData?.groupId === 'string' ?  parseInt(fireData.groupId): 0 : 0,
                isFrom:fireData?.isfrom,
                projectId: fireData?.buildingId ? fireData.buildingId: 0,
                folderId: fireData?.folderid ? fireData.folderid: 0,
                subfolderId: fireData?.subfolderid ? fireData.subfolderid: 0,
                ChildSubFolderId: fireData?.childSubfolderId ? fireData.childSubfolderId: 0
              });
            }else if(!!fireData?.ispage && typeof fireData?.ispage === 'string' && fireData.ispage.toLowerCase() == "approval" ){
              navigate('Document',{
                projectId: fireData.buildingId, 
                folderId: fireData?.folderid, 
                subfolderId: fireData?.subfolderid, 
                ChildSubFolderId: fireData?.childSubfolderId
              })
            }
            else if(typeof fireData?.ispage === 'string' && fireData.ispage.toLowerCase() != "approval" && fireData.ispage.toLocaleLowerCase() != "chat"){
              navigate('Dashboard', {projectId: fireData?.buildingId});
            }
      });

      messaging().getInitialNotification().then( remoteMessage => {
        console.log('quit state : getInitialNotification',remoteMessage);
      });
      return unsubscribe;
}