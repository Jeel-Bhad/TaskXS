import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './notificationStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import {Checkbox} from 'react-native-paper';
import {AppDispatch} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import { RenderHTML } from 'react-native-render-html';
import {
  markAllAsReadApi,
  notificationSliceActions,
  projectNotificationListApi,
  unReadNotificationCntApi,
} from '../../redux/slices/notificationSlice';
import {rootStateType} from '../../types/reduxStateType';
import {useIsFocused} from '@react-navigation/native';
import { NotificationScreenRouteProp, SignalRScreenNavigationProp } from '../../types/navigationType';
import { setLocalStorageValue } from '../../utils/helpers';
import notifee from '@notifee/react-native';
type PropType = {
  route: NotificationScreenRouteProp,
  navigation:SignalRScreenNavigationProp
}

const Notification = ({route,navigation}:PropType) => {
  const isFocused = useIsFocused();
  const [markAsReadArray, setGlobalList] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set<number>());
  const projectId = route.params.projectId;


  const setPriorityOfProject = async () => {
    projectId && await setLocalStorageValue({field: 'projectId', data: String(projectId)});
  }

  const notificationLstbyProject = useSelector(
    (state: rootStateType) => state.notification?.notificationListByProject?.data,
  );

  useEffect(() => {
    setPriorityOfProject();
    isFocused ? dispatch(projectNotificationListApi({projectId:projectId})):dispatch(notificationSliceActions.clearData());
  }, [isFocused]);

  const markAsRead = async() => {
    dispatch(markAllAsReadApi({markAsReadArray}));
    setSelectedItems(new Set<number>());
    
    setTimeout(()=>{
      dispatch(notificationSliceActions.clearData());
       dispatch(projectNotificationListApi({ projectId: projectId }));
       setSelectAll(false);
    },500);

    setTimeout(()=>{
      dispatch(unReadNotificationCntApi()).unwrap().then((res:any)=>{
        console.log("updated"+res.data);
        notifee.setBadgeCount(res.data);
    });
    },1000)
  };

  const toggleSelectAll = () => {
    const newSelectedItems = new Set<number>(selectedItems); // Clone the selectedItems set

    // Check if all items are currently selected
    const allSelected =
    notificationLstbyProject && newSelectedItems.size === notificationLstbyProject.length;

    if (allSelected) {
      // If all items are selected, clear selection for all items
      newSelectedItems.clear();
    } else {
      // If not all items are selected, select all items
      notificationLstbyProject?.forEach((item, index) => {
        if (!newSelectedItems.has(index)) {
          newSelectedItems.add(index);
        }
      });
    }

    // Update globalArray based on the newSelectedItems
    const updatedGlobalList = Array.from(newSelectedItems)
      .map(idx => {
        const msgId = notificationLstbyProject && notificationLstbyProject[idx]?.messageId;
        if (msgId !== undefined) {
          return {
            groupId: notificationLstbyProject && notificationLstbyProject[idx]?.groupId,
            isGroup: notificationLstbyProject && notificationLstbyProject[idx]?.isGroup,
            messageId: msgId,
          };
        }
        return null;
      })
      .filter(obj => obj !== null) as {
      groupId: number;
      isGroup: boolean;
      messageId: number;
    }[];
    setSelectAll(newSelectedItems.size === notificationLstbyProject?.length);
    // Set the updated values
    setGlobalList(updatedGlobalList);
    setSelectedItems(newSelectedItems);
  };

  const toggleCheckbox = (index: number, groupId: number, isGroup: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(index)) {
      newSelectedItems.delete(index);
    } else {
      newSelectedItems.add(index);
    }

    // Update globalArray based on the newSelectedItems
    const updatedGlobalList = Array.from(newSelectedItems)
      .map(idx => {
        const msgId = notificationLstbyProject && notificationLstbyProject[idx]?.messageId;
        if (msgId !== undefined) {
          return {
            groupId: groupId,
            isGroup: isGroup,
            messageId: msgId,
          };
        }
        return null;
      })
      .filter(obj => obj !== null) as {
      groupId: number;
      isGroup: boolean;
      messageId: number;
    }[];
    setGlobalList(updatedGlobalList);
    setSelectedItems(newSelectedItems);
  };

  const navigateToChat = (isGroup:boolean,senderId:number,buildingName:string,
    contactpersoon:string,groupId:number,isFrom:string,buildingId:number,
    folderId:number,subfolderId:number,childSubfolderId:number,senderName:string) =>{
    
    navigation.navigate("SignalR",{
      isGroup: isGroup ? isGroup:false,
      receiverId: isGroup ? 0 : senderId,
      userName: isGroup ?buildingName:contactpersoon,
      groupId: groupId ? groupId: 0,
      isFrom:isFrom,
      projectId: buildingId ? buildingId: 0,
      folderId: folderId ? folderId: 0,
      subfolderId: subfolderId ? subfolderId: 0,
      ChildSubFolderId: childSubfolderId ? childSubfolderId: 0
    });
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <View style={styles.column1}>
          <Text style={styles.headingStyle}>Mark As Read</Text>
          <TouchableOpacity onPress={markAsRead}>
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              size={20}
              color="#003300"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column2}>
          <Text style={styles.headingStyle}>Select All</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={selectAll ? 'checked' : 'unchecked'}
              onPress={toggleSelectAll}
              style={{
                // Customize your Checkbox styles here
                borderWidth: 1,
                borderColor: 'blue',
                borderRadius: 5,
                padding: 10,
                // Add more custom styles as needed
              }}
              color="green"
            />
          </View>
        </View>
      </View>
      <View style={styles.notificationContainer}>
        <FlatList
          data={notificationLstbyProject}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={()=>navigateToChat(
              item.isGroup,
              item.senderId,
              item.buildingName,
              item.contactpersoon,
              item.groupId,
              item.isFrom,
              item.buildingId,
              item.folderId,
              item.subfolderId,
              item.childSubfolderId,
              item.senderName)}>
            <View style={[styles.singleNotiContainer, styles.row2]}>
              <View style={styles.notcol}>
                <Text>{item.buildingName}</Text>
                <Text style={styles.senderName}>{item.senderName}</Text>
                <RenderHTML
                contentWidth={150}  
                source={{html: item.messageText}}
              />
              </View>
              <View style={styles.notcol2}>
                <View style={styles.checkboxContainer}>
                  <Checkbox.Android
                    status={selectedItems.has(index) ? 'checked' : 'unchecked'}
                    onPress={() =>
                      toggleCheckbox(index, item.groupId, item.isGroup)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: 'blue',
                      borderRadius: 5,
                      padding: 10,
                    }}
                    color="green"
                  />
                </View>
              </View>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Notification;
