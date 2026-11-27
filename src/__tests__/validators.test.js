import { validateAge, validateEmail, validatePassword, validateRegister, validateLogin } from '../utils/validators';

describe('validators', () => {
  it('rejects invalid email and accepts valid one', () => {
    expect(validateEmail('abc')).not.toBe('');
    expect(validateEmail('a@b.com')).toBe('');
  });
  it('enforces password rules', () => {
    expect(validatePassword('short1')).toMatch(/8 characters/);
    expect(validatePassword('onlyletters')).toMatch(/letter and one number/);
    expect(validatePassword('goodpass1')).toBe('');
  });
  it('blocks under-18 users', () => {
    expect(validateAge(17)).toMatch(/18/);
    expect(validateAge(18)).toBe('');
  });
  it('validateRegister returns errors for an empty form', () => {
    const errs = validateRegister({ name: '', email: '', age: '', gender: '', password: '', confirm: '', bio: '', interests: [], terms: false });
    expect(Object.keys(errs)).toHaveLength(9);
  });
  it('validateLogin passes with valid values', () => {
    expect(validateLogin({ email: 'a@b.com', password: 'x' })).toEqual({});
  });
});
