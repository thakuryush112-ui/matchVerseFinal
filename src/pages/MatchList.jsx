import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { passProfile, selectLikedProfiles, selectMutualProfiles, unlikeProfile } from '../store/likesSlice';
import Avatar from '../components/Avatar';

export default function MatchList({ type }) {
  const dispatch = useDispatch();
  const list = useSelector(type === 'mutual' ? selectMutualProfiles : selectLikedProfiles);

  if (list.length === 0) {
    return (
      <div className="state-box">
        <p>{type === 'mutual' ? 'No mutual matches yet. Keep liking profiles on Discover.' : 'You have not liked anyone yet.'}</p>
        <Link to="/discover" className="btn">Go to Discover</Link>
      </div>
    );
  }

  return (
    <ul className="match-list">
      {list.map((p) => (
        <li key={p.id} className="match-row">
          <Avatar profile={p} size={56} />
          <div>
            <Link to={`/profile/${p.id}`}><strong>{p.name}, {p.age}</strong></Link>
            <p className="muted">{p.city} - {p.interests.join(', ')}</p>
          </div>
          <div className="match-actions">
            <button type="button" className="btn btn-ghost" onClick={() => dispatch(unlikeProfile(p.id))}>Unlike</button>
            <button type="button" className="btn btn-ghost" onClick={() => dispatch(passProfile(p.id))}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
