import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import { DashboardChatScreenRouteProp, DocumentScreenNavigationProp } from '../../types/navigationType';
import { useIsFocused } from '@react-navigation/native';
import { dashboardChatApi, dashboardSliceActions } from '../../redux/slices/dashboardSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { rootStateType } from '../../types/reduxStateType';
import styles from './dashboardChatStyle';
import {Avatar} from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { formatYourDate, setLocalStorageValue } from '../../utils/helpers';
type PropType = {
    route:DashboardChatScreenRouteProp;
    navigation:DocumentScreenNavigationProp
}
const avatar = require('../../../assets/images/avatar.jpg');
const DashboardChat = ({route,navigation}:PropType) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const projectId=route.params.projectId;

  const setPriorityOfProject = async () => {
    projectId && await setLocalStorageValue({field: 'projectId', data: String(projectId)});
  }

  const dashboardChatList =  useSelector(
     (state: rootStateType) => state.dashboard?.dashboardChatList?.data.folderAllDetailList,
     );
     
  useEffect(() => {
    setPriorityOfProject();
    isFocused ? dispatch(dashboardChatApi({projectId:projectId})) : dispatch(dashboardSliceActions.clearData());
  }, [isFocused]);

  const navigateToDocument = (folderId:number,subfolderId:number,childsubfolderId:number) => {
    navigation.navigate('Document',{projectId: projectId , folderId:folderId , subfolderId:subfolderId , ChildSubFolderId:childsubfolderId});
  }
  return (
    <View>
        <FlatList
          data={dashboardChatList}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => (
            
            <TouchableOpacity onPress={() => navigateToDocument(item.folderId,item.subFolderId,item.childId)}>
            <View style={styles.singleNotiContainer}>
              <View style={styles.row}>
                <View style={styles.col1}>
              <Avatar.Image
              size={50}
              source={item.imageProfile ? {uri: `data:image/png;base64,${item.imageProfile}`} : avatar}
            /></View>
                <View style={styles.col2}>
                <Text style={styles.normalText}>{formatYourDate(item.senddate).formattedDate}</Text>
                <Text style={styles.folderName}>{item.folderName}</Text>
                <RenderHTML
                contentWidth={150}  
                source={{html: item?.messageText}} />
                </View>
              </View>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
  );
};

export default DashboardChat;