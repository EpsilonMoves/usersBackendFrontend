import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: [],
  },
  reducers: {
    addReducerUser: (state, action) => {
      const newUsers = [...state.value, action.payload];
      state.value = newUsers;
    },
    deleteReducerUser: (state, action) => {
      state.value = state.value.filter((e) => e._id !== action.payload);
    },
    setReducerUsers: (state, action) => {
      state.value = action.payload;
    },

    updateReducerUser: (state, action) => {
      const copyArr = [...state.value];
      const userIndex = copyArr.findIndex((e) => e._id === action.payload.id);
      copyArr[userIndex].firstName = action.payload.firstName;
      copyArr[userIndex].lastName = action.payload.lastName;
      state.value = [...copyArr];
    },
  },
});

export const {
  addReducerUser,
  deleteReducerUser,
  setReducerUsers,
  updateReducerUser,
} = usersSlice.actions;
export const selectUsers = (state) => state.reducer.value;

export default usersSlice.reducer;
