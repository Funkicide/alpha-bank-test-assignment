import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId, zip } from 'lodash';

import routes from '../routes';

const initialState = {
  cards: {},
  likedCards: {},
  ids: [],
  uiState: {},
};

export const fetchData = createAsyncThunk(
  'cardsInfo/fetchData',
  async (number) => {
    const { data: picturesData } = await axios.get(routes.api.picturesPath(number));
    const { data: { data: factsData } } = await axios.get(routes.api.factsPath(number));

    return { picturesData, factsData };
  },
);

const cardsSlice = createSlice({
  name: 'cardsInfo',
  initialState,
  reducers: {
    deleteCard: (state, { payload: { cardId } }) => {
      delete state.cards[cardId];
      state.ids = state.ids.filter((id) => id !== cardId);
      delete state.likedCards[cardId];
      delete state.uiState[cardId];
    },
    changeLikedStatus: (state, { payload: { cardId } }) => {
      state.uiState[cardId].isLiked = !state.uiState[cardId].isLiked;
      if (!state.likedCards[cardId]) {
        state.likedCards[cardId] = state.cards[cardId];
      } else {
        delete state.likedCards[cardId];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload: { picturesData, factsData } }) => {
      const cardsData = zip(picturesData, factsData);

      cardsData.reduce((acc, [pictureUrl, fact]) => {
        const cardId = uniqueId();
        acc[cardId] = { url: pictureUrl, id: cardId, fact };
        state.ids.push(cardId);
        state.uiState[cardId] = { isLiked: false };

        return acc;
      }, state.cards);
    });
  },
});

export const { actions } = cardsSlice;

export default cardsSlice.reducer;
