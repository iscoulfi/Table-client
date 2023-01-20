import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('id', data.newUser._id);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      });
      if (data.user.statusUser === 'blocked') {
        throw new Error('You are blocked');
      }

      if (data.token) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('id', data.user._id);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getLoginTime = createAsyncThunk(
  'auth/getLoginTime',
  async ({ username, date }) => {
    try {
      const { data } = await axios.put(`/auth/${username}`, {
        loginTime: date,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const blockUser = createAsyncThunk(
  'table/blockUser',
  async ({ uname, s }) => {
    try {
      console.log(uname, s);
      const { data } = await axios.put(`/auth/${uname}`, {
        statusUser: s,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },

  extraReducers: {
    // Register user
    [registerUser.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Login user
    [loginUser.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // check auth
    [getMe.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //login time
    [getLoginTime.pending]: () => {},
    [getLoginTime.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [getLoginTime.rejected]: () => {},
  },
});

export const checkIsAuth = state => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
