import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async state management: loading / success / error handling for a REST call.
export const fetchProfiles = createAsyncThunk('profiles/fetch', async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}profiles.json`);
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);
  return res.json();
});

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not load profiles';
      });
  },
});

export default profilesSlice.reducer;
