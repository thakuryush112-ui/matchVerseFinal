// Pure validation functions: each returns an error string ('' means valid).
export const validateName = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return 'Name is required';
  if (s.length < 2) return 'Name must be at least 2 characters';
  return '';
};

export const validateEmail = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'Enter a valid email like name@example.com';
  return '';
};

export const validatePassword = (v) => {
  const s = String(v ?? '');
  if (!s) return 'Password is required';
  if (s.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Za-z]/.test(s) || !/\d/.test(s)) return 'Use at least one letter and one number';
  return '';
};

export const validateConfirm = (password, confirm) => {
  if (!confirm) return 'Confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return '';
};

export const validateAge = (v) => {
  if (v === '' || v === null || v === undefined) return 'Age is required';
  const n = Number(v);
  if (!Number.isInteger(n)) return 'Age must be a whole number';
  if (n < 18) return 'You must be 18 or older to join';
  if (n > 99) return 'Enter a valid age';
  return '';
};

export const validateGender = (v) => (v ? '' : 'Select a gender');

export const validateBio = (v) => {
  const s = String(v ?? '').trim();
  if (s.length < 10) return 'Write at least 10 characters about yourself';
  if (s.length > 150) return 'Bio can be at most 150 characters';
  return '';
};

export const validateInterests = (list) =>
  Array.isArray(list) && list.length >= 2 ? '' : 'Pick at least 2 interests';

export const validateTerms = (v) => (v ? '' : 'Accept the terms to continue');

const clean = (errors) => Object.fromEntries(Object.entries(errors).filter(([, m]) => m));

export const validateRegister = (v) =>
  clean({
    name: validateName(v.name),
    email: validateEmail(v.email),
    age: validateAge(v.age),
    gender: validateGender(v.gender),
    password: validatePassword(v.password),
    confirm: validateConfirm(v.password, v.confirm),
    bio: validateBio(v.bio),
    interests: validateInterests(v.interests),
    terms: validateTerms(v.terms),
  });

export const validateLogin = (v) =>
  clean({
    email: validateEmail(v.email),
    password: v.password ? '' : 'Password is required',
  });

export const validateProfile = (v) =>
  clean({
    name: validateName(v.name),
    age: validateAge(v.age),
    gender: validateGender(v.gender),
    bio: validateBio(v.bio),
    interests: validateInterests(v.interests),
  });
