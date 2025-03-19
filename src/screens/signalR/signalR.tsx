import {Dimensions, StyleSheet, FlatList, Text, View, KeyboardAvoidingView, Keyboard,Platform} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SignalRScreenNavigationProp, SignalRScreenRouteProp } from '../../types/navigationType';
import { formatYourDate, getLocalStorageValue } from '../../utils/helpers';
import SignalrService from '../../utils/signalRService';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateGroupMessageReadApi, chatSliceActions, getDetailByMsgIdApi, getMsgByIdApi, sendMsgApi, updateMessageReadApi } from '../../redux/slices/chatSlice';
import { rootStateType } from '../../types/reduxStateType';
import styles from './signalRStyle';
const moment = require('moment');
import Input from '../../components/textInput/Input';
import { Controller, useForm } from 'react-hook-form';
import { RenderHTML } from 'react-native-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraAlt, faCancel, faImages } from '@fortawesome/free-solid-svg-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'react-native-image-picker';
import { unReadNotificationCntApi } from '../../redux/slices/notificationSlice';
import notifee from '@notifee/react-native';
type PropType = {
  route: SignalRScreenRouteProp,
  navigation: SignalRScreenNavigationProp
}

const SignalR = ({route, navigation}: PropType) => {
  const flatListRef = useRef<FlatList>(null);
  const {showActionSheetWithOptions} = useActionSheet();
  const form = useForm({defaultValues: {msgText: ''}});
  const {control, setValue} = form;
  const [inputValue, setInputValue] = useState('');
  navigation.setOptions({headerTitle: route.params.userName});
  const userIDRef = useRef<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const signalR = new SignalrService();
  const isGrp=route.params.isGroup;
  const groupId=isGrp?(route.params.groupId!=null?route.params.groupId:0):0;
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  
  const [msgListGlobal, setMsgList] = useState<any[]>([]);

  const msgListRef=useRef<any[]>()
  const msgIDRef = useRef<number | null>(null);
  const isReceiverOnlineRef = useRef<boolean|false>(false);

  const signalRef=useRef<any>();
  const msgExist = () =>{
    dispatch(getMsgByIdApi({
      payloadGrp: {projectId: route.params.projectId, folderId: route.params.folderId, groupId: groupId, receiverId: route.params.receiverId, subFolderId: route.params.subfolderId, subSubFolderId: route.params.ChildSubFolderId}
    })).unwrap().then( (response:any)=>{
      console.log("MSGID",response.data.id);
      msgIDRef.current=response.data.id;
      response.data.id &&  dispatch(getDetailByMsgIdApi({messageId: response.data.id}))
      .unwrap().then((res:any)=>{
        let getResponse=res.data;
        const modifiedList = getResponse.map((item:any) => ({...item, sendDate: formatYourDate(item.sendDate).formattedDate}));
        msgListRef.current=modifiedList
        setMsgList(modifiedList);
      });
      !isGrp &&  dispatch(updateMessageReadApi({messageDetailId: response.data.id, userId: userIDRef.current || 0}));
      isGrp &&  dispatch(UpdateGroupMessageReadApi({messageId: response.data.id, userId: userIDRef.current || 0}));
    });
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const userId = await getLocalStorageValue('id');
        if (userId) {
          userIDRef.current = Number(userId);
          console.log(" userIDRef.current"+ userIDRef.current);
          await signalR.startConnection().then(async () => {
            await signalR.connectToHub(userIDRef.current, groupId);
            signalRef.current=signalR;
            signalR.onlineUserList.subscribe((users: any[]) => {
              setOnlineUsers(users);
            });
          }).catch((error)=>{
             console.error("Error while establishing SignalR connection:", error);
            })
        };
        
        await signalRef.current.connectionHub.on('ReceiveMessageGroup', async (message: any, receiverIdFromLive: any) => {
          console.log("-ReceiveMessageGroup-"+"-message-"+message+"-receiverIdFromLive-"+receiverIdFromLive)
          const currentdate = new Date();
          const sendTime = formatYourDate(currentdate).formattedDate;
          const SenderFromList = msgListRef.current?.find(item => item.senderId === receiverIdFromLive);
          const senderName = SenderFromList ? SenderFromList.senderName : route.params.userName;
          const newMessage = {
            senderId: receiverIdFromLive,
            senderName: senderName,
            receiverId: route.params.receiverId,
            messageText: message.replace(/\r?\n/g, '<br/>'),
            sendDate: sendTime,
          };
          if (isGrp && (userIDRef.current !== receiverIdFromLive)) {
            setMsgList(prevMsgList => [...prevMsgList, newMessage]);
            flatListRef.current?.scrollToEnd({animated: true});
          }
        });

        await signalRef.current.connectionHub.on('ReceiveMessage', async (message: any, receiverIdFromLive: any) => {
          const currentdate = new Date();
          console.log("-ReceiveMessage-"+"-message-"+message+"-receiverIdFromLive-"+receiverIdFromLive)
          const sendTime = formatYourDate(currentdate).formattedDate;
          const SenderFromList = msgListRef.current?.find(item => item.senderId === receiverIdFromLive);
          const senderName = SenderFromList ? SenderFromList.senderName : route.params.userName;
          const newMessage = {
            senderId: receiverIdFromLive,
            senderName: senderName,
            receiverId: route.params.receiverId,
            messageText: message.replace(/\r?\n/g, '<br/>'),
            sendDate: sendTime,
          };
    
          if (!isGrp && receiverIdFromLive === route.params.receiverId) {
            setMsgList(prevMsgList => [...prevMsgList, newMessage]);
            flatListRef.current?.scrollToEnd({animated: true});
          }
        })
        msgExist();
      } catch (error) {
        
      }
    };
    fetchData();
    setTimeout(()=>{
      dispatch(unReadNotificationCntApi()).unwrap().then((res:any)=>{
          console.log("updated"+res.data);
          notifee.setBadgeCount(res.data);
      });
    },5000)
     
  }, []);

  const sendMessage = async (msg:any) =>{
    if(onlineUsers.length > 0){
      if(!isGrp){
        let isOnline = onlineUsers.filter(x => x.userID == route.params.receiverId);
        if (isOnline.length > 0 && (isOnline[0].userID > 0)) {
          isReceiverOnlineRef.current=true;
          await signalRef.current.connectionHub.invoke("SendMessagePrivate",route.params.receiverId, userIDRef.current, msg).catch((err:any) => console.error("Error:SendMessagePrivate"+err));
        }
      }else{
        isReceiverOnlineRef.current=true;
        await signalRef.current.connectionHub.invoke("SendMessageGroup", msg, userIDRef.current).catch((err:any) => console.error(err));
      }
    }
      let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

      let participateId = isGrp == true ? groupId : userIDRef.current;
      dispatch( sendMsgApi({
        payloadGrp: { 
          projectId:route.params.projectId,
          folderId:route.params.folderId, 
          groupId: isGrp == true ? participateId : null,
          id: msgIDRef.current != null ? msgIDRef.current : 0,
          participate_1: isGrp == true ? null : participateId,
          participate_2: isGrp == true ? null : route.params.receiverId, 
          subFolderId:route.params.subfolderId, 
          subSubFolderId:route.params.ChildSubFolderId != undefined ? route.params.ChildSubFolderId : 0,
          messageDetails :[{
            messageId: msgIDRef.current != null ? msgIDRef.current : 0,
            senderId:userIDRef.current,
            receiverId: isGrp == true ? null : route.params.receiverId,
            messageText: msg?.replace(/\r?\n/g, '<br/>'),
            groupId:isGrp == true ? participateId : null,
            sendDate:localISOTime,
            projectId:route.params.projectId,
            folderId:route.params.folderId, 
            subFolderId:route.params.subfolderId, 
            subSubFolderId:route.params.ChildSubFolderId,
            isPage: "Chat",
            isGroup:isGrp,
            isFrom:route.params.isFrom,
            isMessageRead:isReceiverOnlineRef.current
          }]
        }
      }));
      setInputValue(''); 
      setValue("msgText", "");
      msgExist();
  }

  const handleInputChange = (text: any) =>{
    setInputValue(text)
  };

 const handleChatIconPress = async  () => {
    if(inputValue){
      sendMessage(inputValue);
    }
  };



  const openImagePicker = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };
    
    ImagePicker.launchImageLibrary(options, async (response: ImagePicker.ImagePickerResponse) => {
      if (response.didCancel) { 
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.base64;
        if(imageUri){
            const pictureMessageone = "<img  src='data:" + response.assets?.[0].type + ";base64," + imageUri + "' class='chatImage' data-toggle='modal' data-target='#imageViewer' onclick='ImageViewerFunction(this)'>";
            sendMessage(pictureMessageone);
        }
      }
    });
  };

  const selectFile = () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchCamera(
      options,
      (response: ImagePicker.ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          let imageUri = response.assets?.[0]?.base64;
          const pictureMessageone = "<img  src='data:" + response.assets?.[0].type + ";base64," + imageUri + "' class='chatImage' data-toggle='modal' data-target='#imageViewer' onclick='ImageViewerFunction(this)'>";
            sendMessage(pictureMessageone);
        }
      },
    );
  };

  const handleImgIconPress = () => {
    Keyboard.dismiss();
    const options = ['Take Photo', 'Choose from Gallary', 'Cancel'];
    const cancelButtonIndex = 2;
    const icons = [
      <FontAwesomeIcon icon={faCameraAlt} size={24} />,
      <FontAwesomeIcon icon={faImages} size={24} />,
      <FontAwesomeIcon icon={faCancel} size={24} />,
    ];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        icons,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 1:
            openImagePicker();
            break;

          case 0:
            selectFile();
            break;

          case cancelButtonIndex:
        }
      },
    );
  }



  return (
    <KeyboardAvoidingView style={{flex:1}}
    behavior={Platform.OS=='ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS==='ios'? 90 : undefined}
    >
    <View style={{flex: 1, marginBottom: 25}}>
    
      <FlatList
        ref={flatListRef} 
        style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}
        data={msgListGlobal}
        renderItem={({item, index}) => (
          <View style={item.senderId !== userIDRef.current ? styles.leftContainer : styles.rightContainer}>
            <View style={item.senderId !== userIDRef.current ? [styles.leftBubble, styles.containerCommon] : [styles.rightBubble, styles.containerCommon]}>
              <RenderHTML
                contentWidth={300}  
                tagsStyles={{body: item.senderId !== userIDRef.current ? styles.leftMessageText : styles.rightMessageText}}
                source={{html: item.messageText}}
              />
            </View>
            <Text style={item.senderId !== userIDRef.current ? styles.dateUsername : styles.rightdateUsername}>{item.sendDate}</Text>
            <Text style={item.senderId !== userIDRef.current ? styles.dateUsername : styles.rightdateUsername}>{item.senderName}</Text>
          </View>
        )}
      />
      <View style={{margin: 10}}>
        <Controller
          name={'msgText'}
          control={control}
          render={({field: {onChange, value} }) => (
            <Input
              placeHolder="Type a message" 
              onChange={(text) => {
                onChange(text);
                handleInputChange(text);
              }}
              textColor='black'
              onImgIconPress={handleImgIconPress}
              onChatIconPress={handleChatIconPress}  
              imgChatButton fromChat value={value}
            />
          )}
        />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default SignalR;
