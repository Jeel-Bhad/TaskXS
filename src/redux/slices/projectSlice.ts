import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../api';

const initialState = {
  projectList: null,
};

export const projectListApi = createAsyncThunk(
  'project/projectListApi:load',
  async () => {
    try {
      const {data} = await axiosInstance.get(`/Dashboard/GetListAll`);

      return data;
    } catch (error) {}
  },
);
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearData : (state) =>{
      state.projectList = null
    }
  },
  extraReducers: builder => {
    builder.addCase(projectListApi.fulfilled, (state, action) => {
      state.projectList = action.payload;
    });
  },
});

export default projectSlice;
export const projectSliceActions = projectSlice.actions;
