// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import coursesReducer from './coursesSlice';
import practiceReducer from './practiceSlice';
import earnReducer from './earnSlice';
import marketplaceReducer from './marketplaceSlice';
import communityReducer from './communitySlice';
import uiReducer from './uiSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    courses: coursesReducer,
    practice: practiceReducer,
    earn: earnReducer,
    marketplace: marketplaceReducer,
    community: communityReducer,
    ui: uiReducer,
    notifications: notificationsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
