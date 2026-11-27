import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../store/profilesSlice';
import { likeProfile, passProfile } from '../store/likesSlice';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import useDebounce from '../hooks/useDebounce';
import ProfileCard from '../components/ProfileCard';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Avatar from '../components/Avatar';

const PAGE_SIZE = 6;

export default function Discover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((s) => s.profiles);
  const { liked, passed } = useSelector((s) => s.likes);
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();

  const [query, setQuery] = useState('');
  const [gender, setGender] = useState('all');
  const [maxAge, setMaxAge] = useState(40);
  const [sortBy, setSortBy] = useState('distance');
  const [page, setPage] = useState(1);
  const [matched, setMatched] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  // Search + filter + sort, recomputed only when inputs change.
  const visible = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const list = items.filter((p) => {
      if (passed.includes(p.id)) return false;
      if (gender !== 'all' && p.gender !== gender) return false;
      if (p.age > maxAge) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.interests.some((i) => i.toLowerCase().includes(q))
      );
    });
    const sorters = {
      distance: (a, b) => a.distanceKm - b.distanceKm,
      age: (a, b) => a.age - b.age,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...list].sort(sorters[sortBy]);
  }, [items, passed, debouncedQuery, gender, maxAge, sortBy]);

  useEffect(() => setPage(1), [debouncedQuery, gender, maxAge, sortBy]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const requireLogin = useCallback(() => {
    showToast('Log in to like or pass profiles', 'info');
    navigate('/login', { state: { from: '/discover' } });
  }, [navigate, showToast]);

  const handleLike = useCallback((profile) => {
    if (!isLoggedIn) return requireLogin();
    dispatch(likeProfile(profile.id));
    if (profile.likesYou) setMatched(profile);
    else showToast(`You liked ${profile.name.split(' ')[0]}`, 'success');
    return undefined;
  }, [isLoggedIn, requireLogin, dispatch, showToast]);

  const handlePass = useCallback((id) => {
    if (!isLoggedIn) return requireLogin();
    dispatch(passProfile(id));
    return undefined;
  }, [isLoggedIn, requireLogin, dispatch]);

  const closeMatch = useCallback(() => setMatched(null), []);

  return (
    <section>
      <h1>Discover</h1>

      <div className="filters">
        <label>
          Search
          <input
            type="search"
            placeholder="Name, city or interest"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Show
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="all">Everyone</option>
            <option value="woman">Women</option>
            <option value="man">Men</option>
            <option value="nonbinary">Non-binary</option>
          </select>
        </label>
        <label>
          Max age: {maxAge}
          <input type="range" min="18" max="40" value={maxAge} onChange={(e) => setMaxAge(Number(e.target.value))} />
        </label>
        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="distance">Nearest</option>
            <option value="age">Age</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      {status === 'loading' && <Spinner label="Loading profiles" />}
      {status === 'failed' && <ErrorMessage message={error} onRetry={() => dispatch(fetchProfiles())} />}

      {status === 'succeeded' && (
        <>
          <p className="muted">{visible.length} {visible.length === 1 ? 'person' : 'people'} match your filters</p>
          {visible.length === 0 ? (
            <div className="state-box">
              <p>No one matches these filters. Try a wider age range or clear the search.</p>
              <button type="button" className="btn btn-ghost" onClick={() => { setQuery(''); setGender('all'); setMaxAge(40); }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid">
              {pageItems.map((p) => (
                <ProfileCard
                  key={p.id}
                  profile={p}
                  isLiked={liked.includes(p.id)}
                  onLike={handleLike}
                  onPass={handlePass}
                />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <Modal open={Boolean(matched)} title="It's a match!" onClose={closeMatch}>
        {matched && (
          <div className="match-modal">
            <Avatar profile={matched} size={96} />
            <p>You and <strong>{matched.name}</strong> like each other.</p>
            <div className="hero-actions">
              <Link to="/matches/mutual" className="btn" onClick={closeMatch}>See matches</Link>
              <button type="button" className="btn btn-ghost" onClick={closeMatch}>Keep browsing</button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
