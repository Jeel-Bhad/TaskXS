import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import sharedSlice from './slices/sharedSlice';
import projectSlice from './slices/projectSlice';
import profileSlice from './slices/profileSlice';
import notificationSlice from './slices/notificationSlice';
import dashboardSlice from './slices/dashboardSlice';
import documentSlice from './slices/documentSlice';
import chatSlice from './slices/chatSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shared: sharedSlice.reducer,
    project: projectSlice.reducer,
    profile: profileSlice.reducer,
    notification: notificationSlice.reducer,
    dashboard: dashboardSlice.reducer,
    document: documentSlice.reducer,
    chat : chatSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;