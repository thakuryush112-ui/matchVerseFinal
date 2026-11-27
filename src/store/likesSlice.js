import { createSelector, createSlice } from '@reduxjs/toolkit';

export const loadLikes = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('mv_likes'));
    if (saved && Array.isArray(saved.liked) && Array.isArray(saved.passed)) return saved;
  } catch {
    /* fall through */
  }
  return { liked: [], passed: [] };
};

const likesSlice = createSlice({
  name: 'likes',
  initialState: loadLikes,
  reducers: {
    likeProfile(state, action) {
      const id = action.payload;
      state.passed = state.passed.filter((x) => x !== id);
      if (!state.liked.includes(id)) state.liked.push(id);
    },
    passProfile(state, action) {
      const id = action.payload;
      state.liked = state.liked.filter((x) => x !== id);
      if (!state.passed.includes(id)) state.passed.push(id);
    },
    unlikeProfile(state, action) {
      state.liked = state.liked.filter((x) => x !== action.payload);
    },
    resetSwipes() {
      return { liked: [], passed: [] };
    },
  },
});

export const { likeProfile, passProfile, unlikeProfile, resetSwipes } = likesSlice.actions;
export default likesSlice.reducer;

// Selectors (memoised with createSelector)
const selectItems = (s) => s.profiles.items;
const selectLiked = (s) => s.likes.liked;

export const selectLikedProfiles = createSelector([selectItems, selectLiked], (items, liked) =>
  items.filter((p) => liked.includes(p.id)),
);

// A mutual match = you liked them AND they already like you.
export const selectMutualProfiles = createSelector([selectLikedProfiles], (likedProfiles) =>
  likedProfiles.filter((p) => p.likesYou),
);
