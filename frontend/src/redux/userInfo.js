import { createSlice } from "@reduxjs/toolkit";
// Create Slice helps with making reducers change states

export const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    value: {
      firstName: "",
      lastName: "",
      email: "",
      survey: "",
      phone: "",
      profession: "",
      filename: "",
      isLoggedIn: null,
      isLocum: null,
      isActive: null,
      isAdmin: null,
      nanoId: null,
      completeAccess: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = {
        firstName: "",
        lastName: "",
        email: "",
        survey: "",
        phone: "",
        profession: "",
        filename: "",
        isLoggedIn: false,
        isLocum: false,
        isActive: false,
        isAdmin: false,
        nanoId: null,
        completeAccess: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
