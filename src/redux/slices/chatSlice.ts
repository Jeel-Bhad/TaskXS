import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api";
import { UpdateGroupMessageReadPayload, chatUserListPayload, getDetailByMsgIdPayload, getMsgByIdPayload, sendMsgPayload, updateMessageReadPayload } from "../../types/payloadType";
import { chatGrpPayload } from "../../types/payloadType";
const initialState = {
    chatUserList: null,
    chatGrp: null,
    msgId:null,
    msgList: null,
    updateMessageRead: null,
    updateGrpRead: null,
    sendMsg:null,
  };
  export const chatUserListApi = createAsyncThunk(
    'chat/chatUserListApi:load',
    async ({projectId,folderId,subFolderId,subsubFolderId}: chatUserListPayload) => {
      try {
        const {data} = await axiosInstance.get(
          `/Chat/GetChatDetail?projectId=${projectId}&folderId=${folderId}&subFolderId=${subFolderId}&subsubFolderId=${subsubFolderId}`,
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  );

  export const chatGrpApi = createAsyncThunk(
    'chat/chatGrpApi:load',
    async ({chatGrp}:chatGrpPayload) => {
      try {
        const {data} = await axiosInstance.post(
          `/Chat/CreateGroup`,chatGrp
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  )

  export const getMsgByIdApi = createAsyncThunk(
    'chat/getMsgByIdApi:load',
    async ({payloadGrp}:getMsgByIdPayload) => {
      try {
        const {data} = await axiosInstance.post(
          `/Chat/GetMessageById`,payloadGrp
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  )

  export const getDetailByMsgIdApi = createAsyncThunk(
    'chat/getDetailByMsgIdApi:load',
    
    async ({messageId}:getDetailByMsgIdPayload) => {
      try {
        const {data} = await axiosInstance.get(
          `/Chat/GetDetailByMessageId?messageId=${messageId}`,
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  )

  export const UpdateGroupMessageReadApi = createAsyncThunk(
    'chat/UpdateGroupMessageReadApi:load',
    async ({messageId,userId}:UpdateGroupMessageReadPayload) => {
      try {
        const {data} = await axiosInstance.get(
          `/Chat/UpdateGroupMessageRead?messageId=${messageId}&userId=${userId}`,
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  )

 

  export const updateMessageReadApi = createAsyncThunk(
    'chat/updateMessageReadApi:load',
    async ({messageDetailId,userId}:updateMessageReadPayload) => {
      try {
        const {data} = await axiosInstance.get(
          `/Chat/UpdateMessageRead?messageDetailId=${messageDetailId}&userId=${userId}`,
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  )

  export const sendMsgApi = createAsyncThunk(
    'chat/sendMsgApi:load',
    async ({payloadGrp}:sendMsgPayload) => {
      try {
        const {data} = await axiosInstance.post(
          `/Chat`,payloadGrp
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  )
  const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
      clearData : (state) => {
        state.chatUserList = null,
        state.chatGrp = null,
        state.msgId = null,
        state.msgList = null,
        state.updateMessageRead = null,
        state.updateGrpRead = null,
        state.sendMsg=null
      },
    },
    extraReducers : builder => {
        builder.addCase(chatUserListApi.fulfilled,(state,action)=>{
            state.chatUserList=action.payload;
        });
        builder.addCase(chatGrpApi.fulfilled,(state,action)=>{
          state.chatGrp=action.payload;
        });

        //getting msgId from this 
        builder.addCase(getMsgByIdApi.fulfilled,(state,action)=>{
          state.msgId=action.payload;
        });

        //pass to this as payload
        builder.addCase(getDetailByMsgIdApi.fulfilled,(state,action)=>{
          state.msgList=action.payload;
        });
        builder.addCase(updateMessageReadApi.fulfilled,(state,action)=>{
          state.updateMessageRead=action.payload;
        });
        builder.addCase(UpdateGroupMessageReadApi.fulfilled,(state,action)=>{
          state.updateGrpRead=action.payload;
        });
        builder.addCase(sendMsgApi.fulfilled,(state,action)=>{
          state.sendMsg=action.payload;
        });
    },
});

export default chatSlice;
export const chatSliceActions = chatSlice.actions;


