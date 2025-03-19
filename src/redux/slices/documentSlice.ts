import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api";
import { documemtListPayload, folderDetailPayload, openDocumentPayload, subfolderDetailPayload } from "../../types/payloadType";

const initialState = {
    documentList: null,
    folderDetail:null,
    subfolderDetail:null,
    openDocument:null
  };

  export const documentListApi = createAsyncThunk(
    'document/documentListApi:load',
    async ({projectId,folderId,subfolderId,ChildSubFolderId}: documemtListPayload) => {
      try {
        const {data} = await axiosInstance.get(
          `/Document/GetDocuments?projectId=${projectId}&folderId=${folderId}&subfolderId=${subfolderId}&ChildSubFolderId=${ChildSubFolderId}`,
        );
  
        data?.success 
        return data;
        
      } catch (error) {
        console.log(error);
      }
    },
  );

  export const folderDetailApi = createAsyncThunk(
    'document/folderDetailApi:load',
    async ({id}:folderDetailPayload) =>{
        try{
            const {data} = await axiosInstance.get(
              `/Folder?id=${id}`,
            );

            data?.success
            return data;
            
        } catch (error) {
         console.log(error);
        }
    }
  );

  export const subfolderDetailApi = createAsyncThunk(
    'document/subfolderDetailApi:load',
    async ({id}:subfolderDetailPayload) =>{
        try{
            const {data} = await axiosInstance.get(
              `/SubFolder?id=${id}`,
            );

            data?.success
            return data;
            
        } catch (error) {
         console.log(error);
        }
    }
  );

  export const openDocumentApi = createAsyncThunk(
    'document/openDocumentApi',
    async ({path}:openDocumentPayload) =>{
        try{
            const {data} = await axiosInstance.get(
              `/Document/OpenDocumentFile?path=${path}`,
            );

            data?.success
            console.log(data)
            return data;
            
        } catch (error) {
         console.log(error);
        }
    }
  );


  const documentSlice = createSlice({
    name:'documemt',
    initialState,
    reducers:{
      clearData : (state) => {
        state.documentList = null,
        state.folderDetail = null,
        state.subfolderDetail = null,
        state.openDocument = null
      },
    },
    extraReducers : builder => {
        builder.addCase(documentListApi.fulfilled,(state,action)=>{
            state.documentList=action.payload;
        });

        builder.addCase(folderDetailApi.fulfilled,(state,action)=>{
            state.folderDetail=action.payload;
        });

        builder.addCase(subfolderDetailApi.fulfilled,(state,action)=>{
          state.subfolderDetail=action.payload;
        });

        builder.addCase(openDocumentApi.fulfilled,(state,action)=>{
          state.openDocument=action.payload;
      });
    },
});

export default documentSlice;
export const documentSliceActions = documentSlice.actions;