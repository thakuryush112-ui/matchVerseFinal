import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profilesSlice';
import likesReducer from './likesSlice';

export const makeStore = (preloadedState) =>
  configureStore({
    reducer: { profiles: profilesReducer, likes: likesReducer },
    preloadedState,
  });

const store = makeStore();

// Persist likes/passes so they survive a refresh.
store.subscribe(() => {
  try {
    localStorage.setItem('mv_likes', JSON.stringify(store.getState().likes));
  } catch {
    /* ignore */
  }
});

export default store;
