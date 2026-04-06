import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  unreadCount: 0
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.items.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => { n.read = true; });
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    }
  }
});

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
