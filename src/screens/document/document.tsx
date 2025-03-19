import {StyleSheet, Alert ,Linking,Text, View,FlatList,Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useIsFocused } from '@react-navigation/native';
import { documentListApi, documentSliceActions, folderDetailApi, openDocumentApi, subfolderDetailApi } from '../../redux/slices/documentSlice';
import { DocumentScreenNavigationProp, DocumentScreenRouteProp } from '../../types/navigationType';
import { rootStateType } from '../../types/reduxStateType';
import styles from './documentStyle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faChevronRight,faChevronDown, faCircle, faComments} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/helpers';
import {Badge} from 'react-native-paper';
import { chatSliceActions, chatUserListApi } from '../../redux/slices/chatSlice';
const moment = require('moment');

type PropType = {
    route : DocumentScreenRouteProp,
    navigation:DocumentScreenNavigationProp,
}

interface DocumentVisibilityState {
  [key: number]: boolean;
}
const check = require('../../../assets/images/check-arrow.png');
const close = require('../../../assets/images/close-arrow.png');

const Document = ({route,navigation}:PropType) => {
    const dispatch = useDispatch<AppDispatch>();
    const isFocused = useIsFocused();
    const {t} = useTranslation();
    const projectId = route.params.projectId;
    const folderId = route.params.folderId;
    const subfolderId = route.params.subfolderId;
    const childsubfolderId = route.params.ChildSubFolderId;
    const finalIdForScreeenTitle= childsubfolderId ? childsubfolderId :subfolderId;
    const chatUserList = useSelector(
      (state: rootStateType) => state.chat?.chatUserList?.data.userList
  );

    const [documentVisibility, setDocumentVisibility] =  useState<DocumentVisibilityState>({});
    const documentList = useSelector(
        (state: rootStateType) => state.document?.documentList?.data
    );
    const folderDetail = useSelector(
        (state: rootStateType) => state.document?.folderDetail?.data
    );
    const subfolderDetail = useSelector(
      (state: rootStateType) => state.document?.subfolderDetail?.data
    );
    const totalUnreadMessages = chatUserList?.reduce((total, user) => total + user.totalUnReadMessage, 0);
    useEffect(() => {
        isFocused ? dispatch(documentListApi({projectId:projectId,folderId:folderId,subfolderId:subfolderId,ChildSubFolderId:childsubfolderId})) : dispatch(documentSliceActions.clearData());
        isFocused ? dispatch(folderDetailApi({id:folderId})) : dispatch(documentSliceActions.clearData());
        isFocused ? dispatch(subfolderDetailApi({id:finalIdForScreeenTitle})) : dispatch(documentSliceActions.clearData());
        isFocused ? dispatch(chatUserListApi({projectId:projectId,folderId:folderId,subFolderId:subfolderId,subsubFolderId:childsubfolderId})) : dispatch(chatSliceActions.clearData());
          }, [isFocused]);

    const togglePreviousVersions = (documentId:any) => {
      setDocumentVisibility((prevState:any) => ({
        ...prevState,
        [documentId]: !prevState[documentId],
      }));
    };
    const redirectToChatlist = () => {
      navigation.navigate('Chatuserlist',{projectId: projectId , folderId:folderId , subfolderId:subfolderId , ChildSubFolderId:childsubfolderId});
    }
    const openDocument =  async (url:any) =>{
      if(!url.includes('.dwg') && !url.includes('.ifc') && !url.includes('.sharepoint')){
        dispatch( openDocumentApi({ path: url })).unwrap().then(async (res:any)=>{
          const filePath=res.data.filePath;
          await Linking.openURL(filePath? filePath : Alert.alert('Document Not Available'));
        });
      }
      else if(url.includes('.sharepoint')){
        console.log(url)
        await Linking.openURL(url);
      }
    }
      
    return (
      <>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.title}>{subfolderDetail?.parentName ? subfolderDetail.parentName : folderDetail?.name} - {subfolderDetail?.name}</Text>
            </View>
            {documentList && documentList.length > 0 ? (
            <FlatList
              data={documentList}
              renderItem={({ item }) => (
                <View style={styles.documentContainer}>
                  <View style={styles.nameIcon}>
                    {item.webIcon && <Image source={{ uri: item.webIcon }} style={styles.imageDocIcon} resizeMode='contain' />}
                    <Text onPress={() => openDocument(item.sharePointDocumentWebUrl === null || item.sharePointDocumentWebUrl === ""?item.liveTopicalUrl:item.sharePointDocumentWebUrl)} style={[item.topicalUrl!='' && !item.topicalUrl.includes('.dwg') && !item.topicalUrl.includes('.ifc') ? styles.textStyleDocNameWithTopicalUrl:styles.textStyleDocName]}>{item.documentNaam}</Text>
                  </View>
                  <Text style={styles.textStyleOther}>{item.documentType}</Text>
                  {item.issueDate && <Text style={styles.textStyleOther}>{t('issuerDate')} : {moment(item.issueDate).format('DD/MM/YYYY')}</Text>}
                  <View style={styles.container}>
                    <View style={styles.row}>
                      <View style={[styles.commonColumn]}>
                        <Text style={styles.textStyleOther}>{t('available')}</Text>
                        {item.beschikbaar ? <Image source={check} style={styles.availabilityIcon} /> :
                          <Image source={close} style={styles.availabilityIcon} />}
                      </View>
                      <View style={[styles.commonColumn]}>
                        <Text style={styles.textStyleOther}>{t('version')}</Text>
                        <Text onPress={() => openDocument(item.sharePointDocumentWebUrl === null || item.sharePointDocumentWebUrl === ""?item.liveTopicalUrl:item.sharePointDocumentWebUrl)} style={item.topicalUrl!='' && !item.topicalUrl.includes('.dwg') && !item.topicalUrl.includes('.ifc') ?styles.textStyleOtherWithDoc:styles.textStyleOther}>{item.topical}</Text>
                      </View>
                      {item.documentVersions.length > 0 &&
                        <View style={[styles.commonColumn]}>
                          <TouchableOpacity onPress={() => togglePreviousVersions(item.id)} style={styles.previousVersion}>
                            <Text style={styles.textStyleOther}>{t('preVersion')}</Text>
                            <FontAwesomeIcon
                              icon={documentVisibility[item.id] ? faChevronDown : faChevronRight}
                              size={14}
                              color="blue" />
                          </TouchableOpacity>
                          {documentVisibility[item.id] && (
                            <>
                              {item?.documentVersions.map((docVersion: any, index) => {
                                return (
                                  <Text onPress={() => openDocument(docVersion.sharePointDocumentWebUrl === "" || docVersion.sharePointDocumentWebUrl===null ? docVersion.liveUrl:docVersion.sharePointDocumentWebUrl)} style={docVersion.liveUrl!='' && !docVersion.liveUrl.includes('.dwg') && !docVersion.liveUrl.includes('.ifc')?styles.textStyleOtherWithDoc:styles.textStyleOther} key={index}>{docVersion.documentVersion}</Text>
                                );
                              })}
                            </>
                          )}
                        </View>}
                    </View>
                  </View>
                </View>)} /> ) : (
                  <View style={styles.noDocumentContainer}>
                    <Text style={styles.noDocumentText}>{t("Document Not Found")}</Text>
                </View>
                )}
          </View>
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 40, right: 50 ,zIndex:1}}>
          <Badge style={{borderRadius:2,overflow: 'visible'}}>{totalUnreadMessages}</Badge>
        </View>

        <TouchableOpacity onPress={ redirectToChatlist}>
          <View style={{ position: 'absolute', bottom: 0, right: 10 }}>
            <FontAwesomeIcon icon={faCircle} style={{ top: 20 }} color={COLORS.primaryColor} size={50} />
            <FontAwesomeIcon icon={faComments} style={{ bottom:20,left:10 }} color='white' size={30} />
          </View>
        </TouchableOpacity>
      </>
    );
};

export default Document;