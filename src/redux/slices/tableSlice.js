import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  all: [],
};

export const getAll = createAsyncThunk('table/getAll', async () => {
  try {
    const { data } = await axios.get('/auth/all');
    return data.users;
  } catch (e) {
    console.log(e.message);
  }
});

export const removeUser = createAsyncThunk('table/removeUser', async id => {
  try {
    const { data } = await axios.delete(`/auth/${id}`, id);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.all = state.all.filter(user => user._id !== action.payload);
    },
    blocker: (state, action) => {
      state.all.find(el => el._id === action.payload.id).statusUser =
        action.payload.status;
    },
  },
  extraReducers: {
    [getAll.pending]: () => {},
    [getAll.fulfilled]: (state, action) => {
      state.all = action.payload;
    },
    [getAll.rejected]: () => {},
    [removeUser.pending]: () => {},
    [removeUser.fulfilled]: (state, action) => {
      state.all = state.all.filter(user => user._id !== action.payload);
    },
    [removeUser.rejected]: () => {},
  },
});

export const { refresh, blocker } = tableSlice.actions;
export default tableSlice.reducer;
