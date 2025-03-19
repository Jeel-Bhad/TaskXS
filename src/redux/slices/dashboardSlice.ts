import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api";
import { childsubfolderPayload, dashboardChatPayload, particularProjectPayload, planningListPayload, subfolderPayload, taskListPayload, ticketListPayload } from "../../types/payloadType";

const initialState = {
    particularProjectList: null,
    subfolderList: null,
    childsubfolderList: null,
    dashboardChatList: null,
    taskList: null,
    planningList: null,
    ticketList: null
  };

export const particularProjectApi = createAsyncThunk(
  'dashboard/particularProjectApi:load',
  async ({projectId}: particularProjectPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Dashboard/GetAll?projectId=${projectId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);

export const subfolderApi = createAsyncThunk(
  'dashboard/subfolderApi:load',
  async ({projectId,folderId}: subfolderPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Dashboard/GetSubFolderDashboard?projectId=${projectId}&folderId=${folderId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);

export const childsubfolderApi = createAsyncThunk(
  'dashboard/childsubfolderApi:load',
  async ({projectId,folderid,subFolderId}: childsubfolderPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Dashboard/GetChildSubFolderDashBoard?folderid=${folderid}&subFolderId=${subFolderId}&projectId=${projectId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);


export const dashboardChatApi = createAsyncThunk(
  'dashboard/dashboardChatApi:load',
  async ({projectId}: dashboardChatPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Folder/GetChatListForDashboard?ProjectId=${projectId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);

export const taskListApi = createAsyncThunk(
  'dashboard/taskListApi:load',
  async ({projectId}: taskListPayload) => {
    console.log("projectId "+projectId);
    try {
      const {data} = await axiosInstance.get(
        `/MOM/TaskListByProject?projectId=${projectId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);

export const planningListApi = createAsyncThunk(
  'dashboard/planningListApi:load',
  async ({planningProjectId}: planningListPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Project/GetKYPPlannings?planningProjectId=${planningProjectId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);

export const ticketListApi = createAsyncThunk(
  'dashboard/ticketListApi:load',
  async ({ticketProjectId}: ticketListPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Project/GetEDContorlsTickets?ticketProjectId=${ticketProjectId}`,
      );

      data?.success 
      return data;
      
    } catch (error) {
      console.log(error);
    }
  },
);

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
      clearData : (state) => {
        state.particularProjectList =null,
        state.subfolderList=null,
        state.childsubfolderList=null,
        state.dashboardChatList=null,
        state.taskList=null,
        state.planningList=null,
        state.ticketList=null
      },

    },
    extraReducers : builder => {
        builder.addCase(particularProjectApi.fulfilled,(state,action)=>{
            state.particularProjectList=action.payload;
        });
        builder.addCase(subfolderApi.fulfilled,(state,action)=>{
          state.subfolderList=action.payload;
        });
        builder.addCase(childsubfolderApi.fulfilled,(state,action)=>{
          state.childsubfolderList=action.payload;
        });
        builder.addCase(dashboardChatApi.fulfilled,(state,action)=>{
          state.dashboardChatList=action.payload;
        });
        builder.addCase(taskListApi.fulfilled,(state,action)=>{
          state.taskList=action.payload;
        });
        builder.addCase(planningListApi.fulfilled,(state,action)=>{
          state.planningList=action.payload;
        });
        builder.addCase(ticketListApi.fulfilled,(state,action)=>{
          state.ticketList=action.payload;
        });
    },
});

export default dashboardSlice;
export const dashboardSliceActions = dashboardSlice.actions;