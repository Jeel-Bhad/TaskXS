import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import { ChatuserlistScreenNavigationProp, ChatuserlistScreenRouteProp } from '../../types/navigationType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { chatGrpApi, chatSliceActions, chatUserListApi } from '../../redux/slices/chatSlice';
import { rootStateType } from '../../types/reduxStateType';
import styles from './chatUserListStyle';
import {Avatar} from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {Badge} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import SignalrService from '../../utils/signalRService';

type PropType = {
    route:ChatuserlistScreenRouteProp,
    navigation:ChatuserlistScreenNavigationProp
}
const avatar = require('../../../assets/images/avatar.jpg');
const Chatuserlist = ({route,navigation}:PropType) => {
  const signalR = new SignalrService();
  const isFocused = useIsFocused();
    const chatUserList = useSelector(
        (state: rootStateType) => state.chat?.chatUserList?.data.userList
    );

    const chatGrpId = useSelector(
      (state: rootStateType) => state.chat?.chatGrp?.data
  );

    const dispatch=useDispatch<AppDispatch>();
    const projectId=route.params.projectId;
    const folderId=route.params.folderId;
    const subfolderId=route.params.subfolderId;
    const ChildSubFolderId=route.params.ChildSubFolderId;
    const selectedIds = chatUserList?.map(({ userId }) => userId);
    useEffect(()=>{
      signalR.startConnection();
      isFocused ? dispatch(chatUserListApi({projectId:projectId,folderId:folderId,subFolderId:subfolderId,subsubFolderId:ChildSubFolderId})): dispatch(chatSliceActions.clearData());
      isFocused ? dispatch(chatGrpApi({chatGrp:{projectId:projectId,userId:selectedIds}})): dispatch(chatSliceActions.clearData());
    },[isFocused]);
    const isFrom = ChildSubFolderId!=0 ? 'childSubFolder' : subfolderId!=0 ?'subFolder':'folder';
    const navigateToChat=(isGroup:boolean,receiverId:number,name:string)=>{
      navigation.navigate('SignalR',{isGroup:isGroup,userName:name,receiverId:receiverId,groupId:chatGrpId,isFrom:isFrom,
        projectId: projectId , folderId:folderId , subfolderId:subfolderId , ChildSubFolderId:ChildSubFolderId
      });
    }
  return (
    <View>
        <FlatList
          data={chatUserList}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => (
            
            <View style={styles.singleUserContainer}>
              <View style={styles.container}>
                <View style={styles.picColumn}>
                {item.totalUnReadMessage > 0 ? (
                      <View style={{ position: 'absolute', bottom: 44, left: 45 ,zIndex:1}}>
                        <Badge style={{overflow: 'visible'}} size={17}></Badge>
                      </View>
                    ):<View></View>}
                    <Avatar.Image size={60} style={{elevation:4}}
                        source={item.profileImage ? {uri: `${item.profileImage}`} : avatar}
                    />
                </View>
                <View style={styles.nameColumn}>
                    <Text style={styles.folderName}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => navigateToChat(item.isGroup,item.receiverId,item.name)}>

                <View style={ styles.arrowColumn}>
                    <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
  );
};

export default Chatuserlist;