import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';

import routes from '../routes';

const initialState = {
  pictures: {},
  likedPictures: {},
  ids: [],
  ui: {},
};

export const fetchData = createAsyncThunk(
  'picturesInfo/fetchData',
  async (picturesNumber) => {
    const { data } = await axios.get(routes.api.picturesPath(picturesNumber));

    return data;
  },
);

const picturesSlice = createSlice({
  name: 'picturesInfo',
  initialState,
  reducers: {
    deletePicture: (state, { payload: { pictureId } }) => {
      delete state.pictures[pictureId];
      state.ids = state.ids.filter((id) => id !== pictureId);
      delete state.likedPictures[pictureId];
      delete state.ui[pictureId];
    },
    changeLikedStatus: (state, { payload: { pictureId } }) => {
      state.ui[pictureId].isLiked = !state.ui[pictureId].isLiked;
      if (!state.likedPictures[pictureId]) {
        state.likedPictures[pictureId] = state.pictures[pictureId];
      } else {
        delete state.likedPictures[pictureId];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      payload.reduce((acc, pictureUrl) => {
        const pictureId = uniqueId();
        acc[pictureId] = { url: pictureUrl, id: pictureId };
        state.ids.push(pictureId);
        state.ui[pictureId] = { isLiked: false };

        return acc;
      }, state.pictures);
    });
  },
});

export const { actions } = picturesSlice;

export default picturesSlice.reducer;
