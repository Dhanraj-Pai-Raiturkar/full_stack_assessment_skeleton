import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice';
import homeSlice from '../slices/homeSlice';
import modalSlice from '../slices/modalSlice';

export default configureStore({
    reducer: {
      userSlice: userSlice,
      homeSlice: homeSlice,
      modalSlice: modalSlice
    }
  });