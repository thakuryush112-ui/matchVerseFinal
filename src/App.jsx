import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from './store/profilesSlice';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Code splitting: each page is loaded only when its route is opened.
const Home = lazy(() => import('./pages/Home'));
const Discover = lazy(() => import('./pages/Discover'));
const ProfileDetail = lazy(() => import('./pages/ProfileDetail'));
const MatchesLayout = lazy(() => import('./pages/MatchesLayout'));
const MatchList = lazy(() => import('./pages/MatchList'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.profiles.status);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProfiles());
  }, [status, dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="discover" element={<Discover />} />
        <Route path="profile/:id" element={<ProfileDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected + nested routes */}
        <Route path="matches" element={<ProtectedRoute><MatchesLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="mutual" replace />} />
          <Route path="mutual" element={<MatchList type="mutual" />} />
          <Route path="liked" element={<MatchList type="liked" />} />
        </Route>
        <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
