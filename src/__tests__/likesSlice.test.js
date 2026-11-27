import { makeStore } from '../store';
import { likeProfile, passProfile, selectMutualProfiles, unlikeProfile } from '../store/likesSlice';

const profiles = [
  { id: 1, name: 'A', likesYou: true },
  { id: 2, name: 'B', likesYou: false },
];

const setup = () =>
  makeStore({
    profiles: { items: profiles, status: 'succeeded', error: null },
    likes: { liked: [], passed: [] },
  });

describe('likes slice', () => {
  it('likes and unlikes a profile', () => {
    const store = setup();
    store.dispatch(likeProfile(1));
    expect(store.getState().likes.liked).toEqual([1]);
    store.dispatch(unlikeProfile(1));
    expect(store.getState().likes.liked).toEqual([]);
  });
  it('passing removes an existing like', () => {
    const store = setup();
    store.dispatch(likeProfile(2));
    store.dispatch(passProfile(2));
    expect(store.getState().likes).toEqual({ liked: [], passed: [2] });
  });
  it('mutual selector only returns people who like you back', () => {
    const store = setup();
    store.dispatch(likeProfile(1));
    store.dispatch(likeProfile(2));
    expect(selectMutualProfiles(store.getState()).map((p) => p.id)).toEqual([1]);
  });
});
