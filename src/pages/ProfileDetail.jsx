import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeProfile, unlikeProfile } from '../store/likesSlice';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { compatibility } from '../utils/helpers';
import Avatar from '../components/Avatar';
import Tabs from '../components/Tabs';
import Spinner from '../components/Spinner';

export default function ProfileDetail() {
  const { id } = useParams(); // dynamic route param
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const { items, status } = useSelector((s) => s.profiles);
  const liked = useSelector((s) => s.likes.liked);

  const profile = items.find((p) => p.id === Number(id));
  const score = useMemo(
    () => (profile && user ? compatibility(user.interests, profile.interests) : null),
    [profile, user],
  );

  if (status === 'loading' || status === 'idle') return <Spinner label="Loading profile" />;
  if (!profile) {
    return (
      <div className="state-box">
        <h1>Profile not found</h1>
        <p>There is no profile with ID {id}.</p>
        <Link to="/discover" className="btn">Back to Discover</Link>
      </div>
    );
  }

  const isLiked = liked.includes(profile.id);
  const toggleLike = () => {
    if (!isLoggedIn) return showToast('Log in to like profiles', 'info');
    if (isLiked) dispatch(unlikeProfile(profile.id));
    else {
      dispatch(likeProfile(profile.id));
      showToast(profile.likesYou ? `It's a match with ${profile.name.split(' ')[0]}!` : 'Liked', 'success');
    }
    return undefined;
  };

  const tabs = [
    { id: 'about', label: 'About', content: <p>{profile.bio}</p> },
    {
      id: 'interests',
      label: 'Interests',
      content: (
        <ul className="chips">
          {profile.interests.map((i) => (
            <li key={i} className={`chip chip-static ${user?.interests?.includes(i) ? 'chip-on' : ''}`}>{i}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'fit',
      label: 'Compatibility',
      content: isLoggedIn ? (
        <p>You share {score}% of your interests with {profile.name.split(' ')[0]}.</p>
      ) : (
        <p><Link to="/login">Log in</Link> to see how your interests overlap.</p>
      ),
    },
  ];

  return (
    <section className="detail">
      <Link to="/discover" className="muted">Back to Discover</Link>
      <div className="detail-head">
        <Avatar profile={profile} size={110} />
        <div>
          <h1>{profile.name}, {profile.age}</h1>
          <p className="muted">{profile.city} - {profile.distanceKm} km away</p>
          <button type="button" className={isLiked ? 'btn btn-liked' : 'btn'} onClick={toggleLike}>
            {isLiked ? 'Liked - tap to undo' : 'Like'}
          </button>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </section>
  );
}
