import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

// Demo-only auth: users live in localStorage. A real app would call a backend
// and never store plain passwords in the browser.
export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('mv_users', []);
  const [user, setUser] = useLocalStorage('mv_user', null);

  const register = useCallback((data) => {
    const email = data.email.trim().toLowerCase();
    if (users.some((u) => u.email === email)) {
      throw new Error('An account with this email already exists');
    }
    const { confirm, terms, ...rest } = data;
    const newUser = { ...rest, id: Date.now(), email, age: Number(rest.age) };
    setUsers((prev) => [...prev, newUser]);
    const { password, ...safe } = newUser;
    setUser(safe);
    return safe;
  }, [users, setUsers, setUser]);

  const login = useCallback((email, password) => {
    const found = users.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
    if (!found) throw new Error('Incorrect email or password');
    const { password: _pw, ...safe } = found;
    setUser(safe);
    return safe;
  }, [users, setUser]);

  const logout = useCallback(() => setUser(null), [setUser]);

  const updateProfile = useCallback((changes) => {
    setUser((prev) => ({ ...prev, ...changes, age: Number(changes.age ?? prev.age) }));
    setUsers((prev) => prev.map((u) => (u.id === user?.id ? { ...u, ...changes, age: Number(changes.age ?? u.age) } : u)));
  }, [setUser, setUsers, user]);

  const value = useMemo(
    () => ({ user, isLoggedIn: Boolean(user), register, login, logout, updateProfile }),
    [user, register, login, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
