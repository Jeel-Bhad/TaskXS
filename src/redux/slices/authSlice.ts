import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../api';
import {
  GetCustomerLogoPayload,
  changePasswordPayload,
  checkUsernameExistPayload,
  domainListPayload,
  forgotPasswordPayload,
  getCompanyLogoInPngFormatePayload,
  isDomainExistPayload,
  loginPayload,
  ssoLoginPayload,
} from '../../types/payloadType';
import {
  customToast,
  getLocalStorageValue,
  setLocalStorageValue,
} from '../../utils/helpers';
import {navigate} from '../../navigations/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const initialState = {
  domainList: null,
  isDomainExist: null,
  loginRes: null,
  loginToken: null,
  changePasswordData: null,
};

export const isDomainExistApi = createAsyncThunk(
  'auth/isDomainExistApi:load',
  async ({domain, navigation,username}: isDomainExistPayload) => {
    try {
      const {data} = await axiosInstance.get(
        `/Customer/DomainExist?domain=${domain}`,
      );
      !data?.data?.success && customToast({type: 'error', text1:"Domain doesn't exist!"});
      data?.data?.success  && await setLocalStorageValue({field: 'Domain', data:data?.data?.data});
      data?.data?.success &&
        navigation.navigate('login', {DomainUrl:data?.data?.data,username:username});
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const domainListApi = createAsyncThunk(
  'auth/domainListApi:load',
    async ({username,navigation}:domainListPayload) => {
      try {
        const {data} = await axiosInstance.get(`/Users/GetDomainListBasedOnUsername?userName=${username}`);
        data.data.length === 1 && await setLocalStorageValue({field: 'Domain', data:data?.data[0]?.domain});
        data.data.length === 0 
        ? customToast({type: 'error', text1: "Invalid username"}) 
        : data.data.length === 1 
            ? data?.data[0]?.enableAzureSSO===true ? navigation.navigate('ssoLogin', {username:username,clientId:data?.data[0]?.clientId,tenantId:data?.data[0]?.tenantId}) :
            navigation.navigate('login', {DomainUrl:data?.data[0]?.name, username: username}) 
            : navigation.navigate('Domain', {username: username});
        return data;
      } catch (error) {}
    },
);

export const loginApi = createAsyncThunk(
  'auth/loginApi:load',
  async ({formData,t}: loginPayload) => {
    try {
      const {data} = await axiosInstance.post('/Authenticate/Login', formData);   
      !data.success && customToast({type: 'error', text1: t('message.invalid')});
      data.success && await setLocalStorageValue({field: 'token', data: data.data.token});
      data.success && await setLocalStorageValue({field: 'id', data: String(data.data.id)});
      data.success && await setLocalStorageValue({
        field: 'refreshToken',
        data: data.data.refreshtoken,
      });   
      return data;
    } catch (error) {}
  },
);

export const AzureAppLoginApi = createAsyncThunk(
  'auth/AzureAppLoginApi:load',
  async ({requestBody,deviceId,domainUrl,isAgent,isIOS,isMobile}: ssoLoginPayload) => {
    try {
      const {data} = await axiosInstance.post(`/Authenticate/AzureAppLogin?
      isIOS=${isIOS}&isMobile=${isMobile}&domainUrl=${domainUrl}&isAgent=${isAgent}&deviceId=${deviceId}`, requestBody,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }); 
      await setLocalStorageValue({field: 'token', data: data.token});
      await setLocalStorageValue({field: 'id', data: String(data.id)});
      await setLocalStorageValue({
        field: 'refreshToken',
        data: data.refreshtoken,
      }); 
      return data;
    } catch (error) {
      console.log(error)
    }
  },
);

export const checkUsernameExistApi = createAsyncThunk(
  'auth/checkUsernameExistApi:load',
  async ({username}: checkUsernameExistPayload, {dispatch}) => {
    try {
      const storedDomain = await getLocalStorageValue('Domain');
      const storedCompanyName = await getLocalStorageValue('Company Name');
      const storedCompanyLogo = await getLocalStorageValue('Company Logo');
      const {data} = await axiosInstance.get(
        `/ForgotPassword/IsUserNameExist?name=${username}`,
      );

      data.data.id === 0 &&
        customToast({type: 'error', text1: "Username or email doesn't exist!"});

      data.data.id !==0 && dispatch (GetCustomerLogoApi({domain:storedDomain?storedDomain:''}));
        data.data &&
        data.data.id !== 0 &&
        dispatch(forgotPasswordApi({email: data.data.email, id: data.data.id,domainName:storedDomain?storedDomain:'',companyLogo:storedCompanyLogo?storedCompanyLogo:'',companyName:storedCompanyName?storedCompanyName:''}));
      return data;
    } catch (error) {}
  },
);

export const forgotPasswordApi = createAsyncThunk(
  'auth/checkUsernameExistApi:load',
  async (formData: forgotPasswordPayload) => {
    try {
      const {data} = await axiosInstance.post(
        '/ForgotPassword/ForgotPassword',
        formData,
      );

      data.success && customToast({type: 'success', text1: data.message});

      return data;
    } catch (error) {}
  },
);

export const GetCustomerLogoApi = createAsyncThunk(
  'auth/GetCustomerLogoApi:load',
  async({domain}:GetCustomerLogoPayload,{dispatch}) => {
    try{
      const {data} = await axiosInstance.get(
        `/Customer/GetCustomerLogo?domain=${domain}`,
      );
      data.success && dispatch (getCompanyLogoInPngFormateApi({domainName:data.data.domain,domainGroupId:data.data.domainGroupId}));
      await setLocalStorageValue({field: 'Company Name', data:data.data.companyName});

    return data;
    }catch(error) {
      console.log(error)
    }
  },
);

export const getCompanyLogoInPngFormateApi = createAsyncThunk (
  'auth/getCompanyLogoInPngFormateApi:load',
  async({domainGroupId,domainName}:getCompanyLogoInPngFormatePayload) => {
    try{
      const {data} = await axiosInstance.get(
        `/Setting/GetCompanyLogoPngFormat?domainName=${domainName}&domainGroupId=${domainGroupId}`,
      );
      const companyLogo = data.data.replace(/\\/g, '/');

      data.success && await setLocalStorageValue({field: 'Company Logo', data:companyLogo});
      return data;
    }catch(error){
      console.log(error)
    }
  }
);
export const getNewToken = createAsyncThunk(
  'auth/getNewToken:load',
  async (_, {dispatch}) => {
    try {
      
      const token = await getLocalStorageValue('token');
      const refreshToken = await getLocalStorageValue('refreshToken');
      const data = await axiosInstance.post(
        `/Authenticate/RefreshToken?accessToken=${token}&refreshToken=${encodeURIComponent(
          refreshToken ?? '',
        )}`,
      );
      console.log('dataToken', data.status);
      console.log(data.status, data.data?.refreshToken, 'status');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      data.data?.accessToken &&
        (await setLocalStorageValue({
          field: 'token',
          data: data.data.accessToken,
        }));
      data.data?.refreshToken &&
        (await setLocalStorageValue({
          field: 'refreshToken',
          data: data.data.refreshToken,
        }));
      navigate('home','');
      return data.data?.accessToken
    } catch (error) {}
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword:load',
  async (formData: changePasswordPayload) => {
    try {
      const {data} = await axiosInstance.post(
        '/ForgotPassword/ChangePassword',
        formData,
      );

      data.data.value &&
        customToast({type: 'success', text1: 'Password changed successfully!'});

      return data;
    } catch (error) {}
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.loginRes = null;
      state.loginToken = null;
    },
    setToken: (state, action) => {
      state.loginToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(isDomainExistApi.fulfilled, (state, action) => {
      state.isDomainExist = action.payload;
    });

    builder.addCase(domainListApi.fulfilled, (state, action) => {
      state.domainList = action.payload;
    });

    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.loginRes = action.payload;
      state.loginToken = action.payload.data?.token;
    });

    builder.addCase(AzureAppLoginApi.fulfilled, (state, action) => {
      state.loginToken = action.payload.data?.token;
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changePasswordData = action.payload;
    });
  },
});

export default authSlice;
export const authSliceActions = authSlice.actions;
