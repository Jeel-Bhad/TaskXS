import {StyleSheet, Text, View, FlatList,TouchableOpacity ,Image ,Modal ,TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TaskScreenRouteProp } from '../../types/navigationType';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { rootStateType } from '../../types/reduxStateType';
import { dashboardSliceActions, planningListApi, taskListApi, ticketListApi } from '../../redux/slices/dashboardSlice';
import PagerView from 'react-native-pager-view';
import styles from './taskStyle';
import { COLORS, formatDateWOTime, setLocalStorageValue } from '../../utils/helpers';
import { RenderHTML } from 'react-native-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
type PropType = {
    route:TaskScreenRouteProp;
}
const Task = ({route}:PropType) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const pagerViewRef = useRef<PagerView>(null);
  const color = useSelector((state: rootStateType) => state.shared.settingsData?.appSettingViewModel?.find((x:any)=>x.name=='SecondaryColor')?.value)
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const projectId=route.params.projectId;
  const planningProjectId = route.params.planningProjectId;
  const ticketProjectId = route.params.ticketProjectId;
  const taskList =  useSelector(
      (state: rootStateType) => state.dashboard?.taskList?.data.lstMOMTopics,
      );
  
  const planningList =  useSelector((state: rootStateType) => state.dashboard?.planningList?.data) || [];

  const ticketList = useSelector((state:rootStateType) => state.dashboard?.ticketList?.data)
  
  const setPriorityOfProject = async () => {
    projectId && await setLocalStorageValue({field: 'projectId', data: String(projectId)});
  }

  useEffect(() => {
    setPriorityOfProject();
    isFocused ? dispatch(taskListApi({projectId:projectId})) : dispatch(dashboardSliceActions.clearData());
    isFocused ? dispatch(planningListApi({planningProjectId:planningProjectId})) : dispatch(dashboardSliceActions.clearData());
    isFocused ? dispatch(ticketListApi({ticketProjectId:ticketProjectId})) : dispatch(dashboardSliceActions.clearData());
  }, [isFocused]);

  const viewImage = (item:string) =>{
    setModalVisible(true);
    setSelectedImageUrl(item);
  }

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUrl(null);
  };

  const tabs = [
    'Minutes'];

  
  const views = [(
    <ScrollView key="1">
      {taskList && taskList?.length > 0 ? (
        <View style={styles.taskContainer}>
        <FlatList
          data={taskList}
          nestedScrollEnabled={true}
          renderItem={({item}) => (
              <View>
                <Text style={styles.meetingName}>{item.meetingName}</Text>
                <View style={styles.taskView}>
                    <View style={styles.column1}>
                        <Text>{item.index}</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text>{item.title}</Text>
                    </View>
                    <View style={styles.column3}>
                        {item.parentId > 0  && item.dueDate ?
                            <Text>{formatDateWOTime(item.dueDate).formattedDate}</Text>: <Text></Text>
                        }
                    </View>
                </View>
              </View>
          )}
        />
      </View>)
      :(taskList?.length === 0 && (
      <View style={styles.taskNotFoundView}> 
      <Text style={styles.TaskNotFound}>{t('Tasks not found')}</Text></View>))}
    </ScrollView>
  )];

  if(planningProjectId){
    tabs.push('Planning');
    views.push(
      <ScrollView key="2">
        {planningList && planningList?.length > 0? 
            <View style={styles.planningContainer}>
            <FlatList
              data={planningList}
              nestedScrollEnabled={true}
              renderItem={({item}) => (
                  <View style={styles.plannigView}>
                    <Text style={styles.meetingName}>{formatDateWOTime(item.startDate).formattedDate}</Text>
                    <Text>{item.name}</Text>
                  </View>
              )}
            />
          </View>
          : planningList?.length === 0 && (
          <View style={styles.taskNotFoundView}> 
          <Text style={styles.TaskNotFound}>{t('Planning not found')}</Text></View>
          )}
      </ScrollView>
    )
  }
  
  if(ticketProjectId){
    tabs.push('Tickets');
    views.push(
      <ScrollView key="3" >
        { ticketList && ticketList?.length > 0 ? 
          <View style={styles.planningContainer}>
            <FlatList
              data={ticketList}
              nestedScrollEnabled={true}
              renderItem={({item, index}) => (
                  <View>
                    <View style={styles.ticketView}>
                        <View style={styles.columnTicket}>
                            <Text style={styles.meetingName}>{formatDateWOTime(item.dateCreated).formattedDate}</Text>
                            <Text style={styles.TaskNotFound}>{item.content.title}</Text>
                            <RenderHTML
                              contentWidth={15}  
                              source={{html: item.content.body}} />
                        </View>
                        <View style={styles.columnTicket2}>
                          {item.content.imageUrl?.map((item,index)=>
                            <TouchableOpacity onPress={() => viewImage(item) }>
                                <Image source={{uri : item}} 
                                key={index}
                                resizeMode='contain'
                                style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                          )}
                        </View>
                    </View>
                  </View>
              )}
            />
          </View>
          : ticketList?.length === 0 && (
          <View style={styles.taskNotFoundView}> 
          <Text style={styles.TaskNotFound}>{t('Tickets not found')}</Text></View>)}
      </ScrollView>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, selectedTab === index && { borderBottomWidth: 2,
              borderBottomColor:color ? color : COLORS.primaryColor}]}
            onPress={() => {
              setSelectedTab(index);
              pagerViewRef.current?.setPage(index);
            }}
          >
            <Text style={{ fontSize: 16,color: color ? color : COLORS.primaryColor}}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <PagerView
        style={{ flexGrow:1 }}
        initialPage={0}
        onPageSelected={(e) => setSelectedTab(e.nativeEvent.position)}
        ref={pagerViewRef}
        useNext>
         {views}
      </PagerView>



      {selectedImageUrl && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}  
        >
          <TouchableWithoutFeedback  onPress={closeModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={closeModal}>
                  <FontAwesomeIcon icon={faCircleXmark} size={20} color='red' ></FontAwesomeIcon>
                </TouchableOpacity>
                <Image
                  source={{ uri: selectedImageUrl }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableWithoutFeedback >
        </Modal>
        )}
  </View>
  );
};

export default Task;
