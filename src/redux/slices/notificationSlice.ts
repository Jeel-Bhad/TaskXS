import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api";
import { markAllAsReadApiPayload, notificationPayload } from "../../types/payloadType";
import { customToast } from "../../utils/helpers";

const initialState = {
    notificationList: null,
    markAsReadList: null,
    notificationListByProject: null,
    unReadNotificationCnt:null
  };

export const notificationListApi = createAsyncThunk(
    'notification/notificationListApi:load',
    async()=>{
        try {
            const {data} = await axiosInstance.get(`/Dashboard/GetUnReadNotificationList`);
            return data;
        } catch (error) {
            
        }
    },
);

export const unReadNotificationCntApi = createAsyncThunk(
  'notification/unReadNotificationCntApi:load',
  async()=>{
      try {
          const {data} = await axiosInstance.get(`/Dashboard/GetUnReadNotificationsCount`);
          console.log("from slice"+JSON.stringify(data))
          return data;
      } catch (error) {
      }
  },
);

export const projectNotificationListApi = createAsyncThunk(
  'notification/projectNotificationListApi:load',
  async({projectId}:notificationPayload)=>{
      try {
          const {data} = await axiosInstance.get(`/Dashboard/GetUnReadNotificationOfProject?projectId=${projectId}`);
          return data;
      } catch (error) {
          
      }
  },
);

export const markAllAsReadApi = createAsyncThunk(
    'notification/markAllAsReadApi:load',
    async ({markAsReadArray}: markAllAsReadApiPayload,{dispatch}) => {
      try {
        const {data} = await axiosInstance.post('/Chat/MarkAllAsReadChatMsg', markAsReadArray);
        data.success && customToast({type: 'success', text1:data.data});

        data.success && dispatch(notificationListApi())
        return data;
      } catch (error) {}
    },
  );

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
      clearData : (state) => {
        state.notificationListByProject = null
      }
    },
    extraReducers : builder => {
        builder.addCase(notificationListApi.fulfilled,(state,action)=>{
            state.notificationList=action.payload;
        });
        
        builder.addCase(unReadNotificationCntApi.fulfilled,(state,action)=>{
          state.unReadNotificationCnt=action.payload;
      });
        builder.addCase(projectNotificationListApi.fulfilled,(state,action)=>{
          state.notificationListByProject=action.payload;
      });

        builder.addCase(markAllAsReadApi.fulfilled, (state, action) => {
            state.markAsReadList= action.payload;
          });
    },
});

export default notificationSlice;
export const notificationSliceActions = notificationSlice.actions;