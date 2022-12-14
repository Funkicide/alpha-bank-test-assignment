import { configureStore } from '@reduxjs/toolkit';

import picturesSlice, { actions as picturesActions, fetchData } from './picturesSlice.js';

export default configureStore({
  reducer: {
    picturesInfo: picturesSlice,
  },
});

export { picturesActions, fetchData };
