import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import userApi from 'api/userApi';
import StorageUser from 'constants/storage-user';
import StorageKeys from 'constants/storage-keys';

export const login = createAsyncThunk('admin/login', async (payload) => {
  const data = await adminApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, data.username);
  localStorage.setItem(StorageKeys.ID, data.id);

  return {
    user: data.username,
    token: data.token,
    id: data.id,
  };
});
export const loginUser = createAsyncThunk('/login', async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageUser.TOKEN, data.token);
  localStorage.setItem(StorageUser.USER, data.username);
  localStorage.setItem(StorageUser.ID, data.id);

  return {
    user: data.username,
    token: data.token,
    id: data.id,
  };
});

const authSlice = createSlice({
  name: 'admin',
  initialState: {
    current:
      {
        user: localStorage.getItem(StorageKeys.USER),
        token: localStorage.getItem(StorageUser.TOKEN),
        id: localStorage.getItem(StorageUser.ID),
      } || {},
    avatarUrl: '',
  },
  reducers: {
    setAvatar(state, action) {
      state.avatarUrl = action.payload;
    },

    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.ID);

      state.current = {};
      state.avatarUrl = '';
    },

    logoutUser(state) {
      localStorage.removeItem(StorageUser.USER);
      localStorage.removeItem(StorageUser.TOKEN);
      localStorage.removeItem(StorageUser.ID);

      state.current = {};
      state.avatarUrl = '';
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setAvatar, logout, logoutUser } = actions;

export default reducer;
