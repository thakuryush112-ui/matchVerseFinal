export const INTERESTS = [
  'Travel', 'Music', 'Gaming', 'Coding', 'Movies', 'Fitness', 'Cooking',
  'Photography', 'Reading', 'Anime', 'Cricket', 'Art', 'Hiking', 'Dancing',
];

export const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');

// Stable hue per id so each avatar keeps its own colour.
export const hueFor = (key) => {
  const s = String(key);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

// Compatibility = shared interests / the user's interests (0-100).
export const compatibility = (mine = [], theirs = []) => {
  if (!mine.length) return 0;
  const shared = theirs.filter((i) => mine.includes(i)).length;
  return Math.round((shared / mine.length) * 100);
};
