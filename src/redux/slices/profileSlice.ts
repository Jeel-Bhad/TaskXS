import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../api';
import {userProfile} from '../../types/reduxStateType';
import {customToast} from '../../utils/helpers';

const initialState = {
  getProfileData: null,
  postProfileData: null,
  issuersList: null,
};

export const getIssuerList = createAsyncThunk(
  'profile/getIssuerList:load',
  async () => {
    try {
      const {data} = await axiosInstance.get('/Issuer/GetIssuerList');

      return data;
    } catch (error) {}
  },
);

export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile:load',
  async (id: string) => {
    try {
      const {data} = await axiosInstance.get(`/Users?id=${id}`);

      return data;
    } catch (error) {}
  },
);

export const postUserProfile = createAsyncThunk(
  'profile/postUserProfile:load',
  async (formData: userProfile) => {
    try {
      const {data} = await axiosInstance.post('/Users', formData);
      data.success && customToast({type: 'success', text1: formData.t('message.profile')});

      return data;
    } catch (error) {}
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.getProfileData = action.payload;
    });

    builder.addCase(postUserProfile.fulfilled, (state, action) => {
      state.postProfileData = action.payload;
    });

    builder.addCase(getIssuerList.fulfilled, (state, action) => {
      state.issuersList = action.payload;
    });
  },
});

export default profileSlice;
export const profileSliceActions = profileSlice.actions;
