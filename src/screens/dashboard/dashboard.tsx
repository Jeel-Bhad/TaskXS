import { Text, View,FlatList,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {  DashboardScreenRouteProp, SubfolderScreenNavigationProp } from '../../types/navigationType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { dashboardSliceActions, particularProjectApi } from '../../redux/slices/dashboardSlice';
import { rootStateType } from '../../types/reduxStateType';
import styles from './dashboardStyle';
import { useIsFocused } from '@react-navigation/native';
import { unReadNotificationCntApi } from '../../redux/slices/notificationSlice';
import notifee from '@notifee/react-native';
import { setLocalStorageValue } from '../../utils/helpers';
type PropType = {
  route: DashboardScreenRouteProp,
  navigation :SubfolderScreenNavigationProp
}

const Dashboard= ({navigation,route}:PropType) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const particularProjectLst = useSelector(
    (state: rootStateType) => state.dashboard?.particularProjectList?.data,
  )
  const projectIdParam = route.params.projectId;

  const setPriorityOfProject = async () => {
    projectIdParam && await setLocalStorageValue({field: 'projectId', data: String(projectIdParam)});
  }
  
  useEffect(() => {
    setPriorityOfProject();
   isFocused ? dispatch(particularProjectApi({projectId:projectIdParam})) : dispatch(dashboardSliceActions.clearData());
  }, [isFocused]);

  const getFolderId = (folderId:number,isSubFolderExist:boolean) => {
    isSubFolderExist?navigation.navigate('Subfolder',{projectId: projectIdParam,folderId:folderId}):
    navigation.navigate('Document',{projectId: projectIdParam , folderId:folderId , subfolderId:0 , ChildSubFolderId:0});
   }
  
  return (
    <View>
      <View style={styles.nameContainer}>
        <Text style={styles.textStyle}>{particularProjectLst?.buildingName}</Text>
      </View>
      <View style={styles.mainfolderContainer}>
        <FlatList data={particularProjectLst ? [particularProjectLst] : []}
          nestedScrollEnabled={true}
          renderItem={({ item })=>(
          <>
            {item.lstDashboard.map((folder)=>{
              return (
               
                  folder.isAccessRights ?
                  <TouchableOpacity onPress={() => getFolderId(folder.folderId,folder.isSubFolderExist)}>
                    <View style={[{backgroundColor:folder.colorCode,
                      borderColor:folder.borderColorCode
                    },styles.particularFolder]} key={folder.folderId}>
                      <Text style={{fontSize:18,color:folder.textColorCode}}>{folder.folderName}</Text>
                    </View>
                  </TouchableOpacity>
                  :
                    <View></View>
                
                );
              })
            } 
          </>
        )}/>
      </View>
    </View>
  );
};

export default Dashboard;