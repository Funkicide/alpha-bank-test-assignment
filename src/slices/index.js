import { configureStore } from '@reduxjs/toolkit';

import cardsReducer, { actions as cardsActions, fetchData } from './cardsSlice.js';

export default configureStore({
  reducer: {
    cardsInfo: cardsReducer,
  },
});

export { cardsActions, fetchData };
