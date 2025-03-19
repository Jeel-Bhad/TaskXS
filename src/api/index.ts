import axios, {AxiosError, AxiosResponse} from 'axios';
import store from '../redux/store';
import {getNewToken} from '../redux/slices/authSlice';
import {getLocalStorageValue} from '../utils/helpers';
import { JsonHubProtocol } from '@microsoft/signalr';


export const axiosInstance = axios.create({
  baseURL: 'https://mcdtestapi.ifour-consultancy.net/api',
  // baseURL: 'https://mcdapi.taskxs.com/api'                     //live
});

axiosInstance.interceptors.request.use(async req => {
  const token1 = await getLocalStorageValue('token');
  // console.log({token1})
  
  req.headers.Authorization = `Bearer ${token1 ?? ''}`;
  return req;
});

// axiosInstance.interceptors.response.use(
//   res => {
//     return res;
//   },
//   (err: AxiosError) => {
//     console.log(err);
    
//     if (err.response?.status === 401) {
//       store.dispatch(getNewToken());

//     }
//     return err;
//   },
// );

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as any;
    console.log("originalRequest "+JSON.stringify(originalRequest));
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const returnSlice= await store.dispatch(getNewToken());
        const token = await getLocalStorageValue('token');
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${returnSlice}`;
          console.log("NEW        originalRequest "+JSON.stringify(originalRequest));
          return axiosInstance(originalRequest);
        }
      } catch (error) { 
        console.error('Error during token refresh:', error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }

);