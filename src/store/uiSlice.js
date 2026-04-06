import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  theme: 'dark',
  loadingOverlay: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    showLoadingOverlay: (state) => {
      state.loadingOverlay = true;
    },
    hideLoadingOverlay: (state) => {
      state.loadingOverlay = false;
    }
  }
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  setTheme,
  showLoadingOverlay,
  hideLoadingOverlay
} = uiSlice.actions;

export default uiSlice.reducer;
