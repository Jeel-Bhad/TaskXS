import {Text, View, ScrollView, FlatList, TouchableOpacity, Alert, Platform, AppState} from 'react-native';
import React, {useDeferredValue, useEffect, useState} from 'react';
import styles from './projectStyle';
import {AppDispatch} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {rootStateType} from '../../types/reduxStateType';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell,faCircleExclamation,faFile,faComments,faFilePen} from '@fortawesome/free-solid-svg-icons';
import {COLORS, getBorder, getLocalStorageValue} from '../../utils/helpers';
import {projectListApi, projectSliceActions} from '../../redux/slices/projectSlice';
import {useIsFocused} from '@react-navigation/native';
import {Badge, Searchbar} from 'react-native-paper';
import {HomeScreenNavigationProp} from '../../types/navigationType';
import { useTranslation } from 'react-i18next';
import { unReadNotificationCntApi } from '../../redux/slices/notificationSlice';
import notifee from '@notifee/react-native';
import { navigate } from '../../navigations/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import { notificationListner } from '../../utils/notificationService';
type PropType = {
  navigation: HomeScreenNavigationProp;
};

const Project = ({navigation}: PropType) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjectList, setFilteredProjectList] = useState<any[]>([]);
  const [prioritizedProjectId, setProjectId] = useState<null|string|undefined>('');

  let projectList = useSelector(
    (state: rootStateType) => state.project?.projectList?.data,
  );

  useEffect(() => {
    isFocused ? dispatch(projectListApi()) : dispatch(projectSliceActions.clearData());
    fetchProjectId();
    setSearchQuery('');
    if(Platform.OS=='android'){
      notificationListner();
    }
    setTimeout(()=>{
      dispatch(unReadNotificationCntApi()).unwrap().then((res:any)=>{
          console.log("updated"+res.data);
          notifee.setBadgeCount(res.data);
      });
    },5000)
  }, [isFocused]);

  // Filter and sort the project list whenever `projectList`, `searchQuery`, or `prioritizedProjectId` changes
  useEffect(() => {
    if (projectList) {
      let filteredList = projectList.slice();

      // Filter by search query
      if (searchQuery) {
        filteredList = filteredList.filter(project =>
          project.buildingName?.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // Sort alphabetically by building name
      filteredList.sort((a, b) => {
        const buildingNameA = (a.buildingName || '').toLowerCase();
        const buildingNameB = (b.buildingName || '').toLowerCase();
        return buildingNameA.localeCompare(buildingNameB);
      });

      // Prioritize the project with the prioritizedProjectId
      if (prioritizedProjectId) {
        filteredList.sort((a, b) => {
          if (a.buildingId === Number(prioritizedProjectId)) return -1;
          if (b.buildingId === Number(prioritizedProjectId)) return 1;
          return 0;
        });
      }
      setFilteredProjectList(filteredList);
    }
  }, [projectList, searchQuery, prioritizedProjectId]);

    const fetchProjectId =async ()=>{ 
      const projectId = await getLocalStorageValue('projectId');
      setProjectId(projectId);
    }
  // useEffect(()=>{
  //   notificationListner();
  // })
  messaging().onMessage(async remoteMessage => {
    console.log('Forground : A new FCM message arrived!', remoteMessage);
    setTimeout(()=>{
      dispatch(unReadNotificationCntApi()).unwrap().then((res:any)=>{
          console.log("updated"+res.data);
          notifee.setBadgeCount(res.data);
      });
    },5000)
    });
  useEffect(() => {
    if (Platform.OS === "ios") {
      notifee.onForegroundEvent(async ({ type, detail }) => {
          const fireData = detail?.notification?.data;

          console.log("User pressed the notification forground.",JSON.stringify(fireData));
          
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
                setTimeout(()=>{navigate('Document',{
                  projectId: fireData.buildingId, 
                  folderId: fireData?.folderid, 
                  subfolderId: fireData?.subfolderid, 
                  ChildSubFolderId: fireData?.childSubfolderId
                });
              },500);
              }
              else if(typeof fireData?.ispage === 'string' && fireData.ispage.toLowerCase() != "approval" && fireData.ispage.toLocaleLowerCase() != "chat"){
                setTimeout(()=>{
                  navigate('Dashboard', {projectId: fireData?.buildingId});
                },500);
              }
      });
      notifee.onBackgroundEvent(async ({ type, detail }) => {
          const data = detail?.notification?.data;
          console.log(
            "User pressed the notification background.",
            JSON.stringify(data)
          );
      });
    }
  }, []);

  const getBuildingId = (buildingId: number) => {
    navigation.navigate('Dashboard', {projectId: buildingId});
  };

  const showNotificationList = (buildingId: number) => {
    navigation.navigate('Notifications', {projectId: buildingId});
  };

  const dashboardChatList = (buildingId: number) => {
    navigation.navigate('DashboardChat', {projectId: buildingId});
  };

  const TaskList = (buildingId: number,ticketProjectId:string,planningProjectId:number) => {
    navigation.navigate('Task', {projectId: buildingId,planningProjectId:planningProjectId,ticketProjectId:ticketProjectId});
  };
  return (
    <View style={{paddingBottom:'22%'}}>
      <View>
        <Searchbar
          placeholder={t('search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          elevation={4}
          style={{
            paddingHorizontal: 15,
            margin: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: '#fff',
          }}
        />
      </View>
      <FlatList
        data={filteredProjectList}
        nestedScrollEnabled={true}
        keyExtractor={item => item.buildingId}
        renderItem={({item}) => (
            <View style={styles.projectContainer} key={item.buildingId}>
              <View style={styles.buildingName}>
                <Text style={styles.textStyleBname}>{item.buildingName}</Text>
              </View>

              <View style={styles.buildingList}>
                <View style={styles.row}>
                  <View style={styles.col2}>
                    <View>
                      <TouchableOpacity onPress={() => getBuildingId(item.buildingId)}>
                        <FontAwesomeIcon
                          icon={faFile}
                          size={30}
                          color={COLORS.primaryColor}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity onPress={() => TaskList(item.buildingId,item.ticketProjectId,item.planningProjectId)}>
                      <FontAwesomeIcon
                        icon={faFilePen}
                        size={30}
                        color={COLORS.primaryColor}
                      />
                    </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity onPress={() => dashboardChatList(item.buildingId)}>
                      <FontAwesomeIcon
                        icon={faComments}
                        size={30}
                        color={COLORS.primaryColor}
                      />
                    </TouchableOpacity>
                    </View>
                    <View>
                    {item.unReadNotificationCount > 0 ?
                      <View style={{ position: 'absolute', bottom: 20, left: 15 }}>
                        <Badge>{item.unReadNotificationCount}</Badge>
                      </View>:<View></View>
                    }
                    <TouchableOpacity onPress={() => showNotificationList(item.buildingId)}>
                      <FontAwesomeIcon
                        icon={faBell}
                        size={30}
                        color={COLORS.primaryColor}
                      />
                    </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
        )}
      />
    </View>
  );
};

export default Project;
