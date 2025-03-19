import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useIsFocused } from '@react-navigation/native';
import { rootStateType } from '../../types/reduxStateType';
import { childsubfolderApi, dashboardSliceActions } from '../../redux/slices/dashboardSlice';
import { ChildsubfolderScreenNavigationProp, ChildsubfolderScreenRouteProp } from '../../types/navigationType';
import styles from './childsufolderStyle';


type PropType = {
    route: ChildsubfolderScreenRouteProp,
    navigation: ChildsubfolderScreenNavigationProp
  }

const Childsubfolder = ({route,navigation}:PropType) => {
    const dispatch = useDispatch<AppDispatch>();
    const isFocused = useIsFocused();
    const projectId = route.params.projectId;
    const folderId = route.params.folderid;
    const subfolderId = route.params.subFolderId;

    const childsubfolderProjectLst = useSelector(
        (state: rootStateType) => state.dashboard?.childsubfolderList?.data,
      );

    const subfolderName=childsubfolderProjectLst?.subFolderName;

    useEffect(() => {
        isFocused ? dispatch(childsubfolderApi({projectId:projectId,folderid:folderId,subFolderId:subfolderId})) : dispatch(dashboardSliceActions.clearData());
          }, [isFocused]);

    navigation.setOptions({headerTitle: subfolderName}) ;

    const getChildsubfolderId = (childsubfolderId:number) => {
         navigation.navigate('Document',{projectId: projectId , folderId:folderId , subfolderId:subfolderId , ChildSubFolderId:childsubfolderId});
       }

    return (
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.textStyle}>{childsubfolderProjectLst?.folderName} - {childsubfolderProjectLst?.subFolderName} </Text>
          </View>
          <FlatList data={childsubfolderProjectLst ? [childsubfolderProjectLst] : []}
              nestedScrollEnabled={true}
              renderItem={({ item })=>(
              <View style={styles.mainChildsubfolderContainer}>
                  <>
                    {item.lstDashboard.map((childsubfolder)=>{
                      return (
                          childsubfolder.isAccessRights ?
                          <TouchableOpacity onPress={() => getChildsubfolderId(childsubfolder.subFolderId)}>
                            <View style={[{backgroundColor:childsubfolder.colorCode,
                              borderColor:childsubfolder.borderColorCode
                            },styles.particularChildsubfolder]} key={childsubfolder.subFolderId}>
                              <Text style={{fontSize:18,color:childsubfolder.textColorCode}}>{childsubfolder.subFolderName}</Text>
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

export default Childsubfolder;
