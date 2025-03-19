import {Action, createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';
import {axiosInstance} from '../../api';
import { COLORS, LOGO } from '../../utils/helpers';
import { settingsPayload } from '../../types/payloadType';

type GlobalSliceInitialState = {
  loading: boolean;
  settingsData: null;
  currentSelectedLanguage:string;
};

export const initialState: GlobalSliceInitialState = {
  loading: false,
  settingsData: null,
  currentSelectedLanguage:'en',
};

export const getSettings = createAsyncThunk(
  'shared/getSettings:load', 
  async ({domain}:settingsPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Setting/GetSettingConfigurationOfDomain?domain=${domain}`);

      return data;
    } catch (error) {}
});

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setCurrentSelectedLanguage(state,  action) {
      state.currentSelectedLanguage = action.payload;
    },

    clearData: (state) => {
      state.settingsData = null
    }
  },
  extraReducers: builder => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settingsData = action.payload.data;
      COLORS.primaryColor = action.payload.data.appSettingViewModel?.find((x:any)=>x.name=='SecondaryColor')?.value;
      LOGO.dynamicLogo = action.payload.data.brandingViewModel?.imageFile;
    });


    builder
      .addMatcher(
        (action: Action) =>
          action.type.includes('/pending') && action.type.includes(':load'),
        state => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action: Action) =>
          action.type.includes('/fulfilled') && action.type.includes(':load'),
        state => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action: Action) =>
          action.type.includes('/rejected') && action.type.includes(':load'),
        state => {
          state.loading = false;
        },
      );
  },
});
export const { setCurrentSelectedLanguage } = sharedSlice.actions;
export const sharedSliceAction = sharedSlice.actions;
export default sharedSlice;
