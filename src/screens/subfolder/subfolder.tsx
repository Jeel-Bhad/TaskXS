import {Text, View,FlatList,TouchableOpacity} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SubfolderScreenNavigationProp, SubfolderScreenRouteProp } from '../../types/navigationType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { dashboardSliceActions, subfolderApi } from '../../redux/slices/dashboardSlice';
import { rootStateType } from '../../types/reduxStateType';
import styles from './subfolderStyle';
import { useIsFocused } from '@react-navigation/native';

type PropType = {
    route: SubfolderScreenRouteProp,
    navigation: SubfolderScreenNavigationProp
  }

const Subfolder= ({route,navigation}:PropType) => {
    const dispatch = useDispatch<AppDispatch>();
    const isFocused = useIsFocused();
    const projectId = route.params.projectId;
    const folderId = route.params.folderId;

    const subfolderProjectLst = useSelector(
        (state: rootStateType) => state.dashboard?.subfolderList?.data,
      );

    const folderName=subfolderProjectLst?.folderName;
    
    useEffect(() => {
      isFocused ? dispatch(subfolderApi({projectId:projectId,folderId:folderId})) : dispatch(dashboardSliceActions.clearData());
        }, [isFocused]);
        
    navigation.setOptions({headerTitle: folderName}) 

    const getSubfolderId = (subfolderId:number,isChildSubFolderExist:boolean) => {
      isChildSubFolderExist ? navigation.navigate('Childsubfolder',{projectId: projectId , folderid:folderId , subFolderId:subfolderId})
      : navigation.navigate('Document',{projectId: projectId , folderId:folderId , subfolderId:subfolderId , ChildSubFolderId:0});
     }

  return (
    <View>
      <View style={styles.nameContainer}>
        <Text style={styles.textStyle}>{subfolderProjectLst?.projectName} - {subfolderProjectLst?.folderName}</Text>
      </View>
      <FlatList data={subfolderProjectLst ? [subfolderProjectLst] : []}
          nestedScrollEnabled={true}
          renderItem={({ item })=>(
          <View style={styles.mainSubfolderContainer}>
              <>
                {item.lstDashboard.map((subfolder)=>{
                  return (
                    subfolder.isAccessRights ?
                      <TouchableOpacity onPress={() => getSubfolderId(subfolder.subFolderId,subfolder.isChildSubFolderExist)}>
                        <View style={[{backgroundColor:subfolder.colorCode,
                          borderColor:subfolder.borderColorCode
                        },styles.particularSubfolder]} key={subfolder.subFolderId}>
                          <Text style={{fontSize:18,color:subfolder.textColorCode}}>{subfolder.subFolderName}</Text>
                        </View>
                      </TouchableOpacity>
                      :
                        <View></View>
                    );
                  })
                } 
              </>
          </View>
      )}/>
    </View>
  );
};

export default Subfolder;