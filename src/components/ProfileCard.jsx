import { memo } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

// React.memo: card only re-renders when its own props change.
function ProfileCard({ profile, isLiked, onLike, onPass }) {
  return (
    <article className="card">
      <Avatar profile={profile} />
      <div className="card-body">
        <h3>
          <Link to={`/profile/${profile.id}`}>{profile.name}, {profile.age}</Link>
        </h3>
        <p className="muted">{profile.city} - {profile.distanceKm} km away</p>
        <p className="bio">{profile.bio}</p>
        <ul className="chips" aria-label="Interests">
          {profile.interests.map((i) => <li key={i} className="chip chip-static">{i}</li>)}
        </ul>
      </div>
      <div className="card-actions">
        <button type="button" className="btn btn-ghost" onClick={() => onPass(profile.id)}>Pass</button>
        <button
          type="button"
          className={isLiked ? 'btn btn-liked' : 'btn'}
          onClick={() => onLike(profile)}
          aria-pressed={isLiked}
        >
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>
    </article>
  );
}

export default memo(ProfileCard);
