import { configureStore } from '@reduxjs/toolkit';
import  usersSlice  from './users-slice';




  // Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

export default configureStore({
    reducer:{
        reducer:usersSlice
    }
}) 