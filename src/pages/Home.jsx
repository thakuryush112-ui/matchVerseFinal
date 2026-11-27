import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/Avatar';

const DOTS = [
  { id: 1, name: 'Aanya Sharma', ring: 1, angle: 20 },
  { id: 4, name: 'Arjun Verma', ring: 1, angle: 200 },
  { id: 3, name: 'Simran Kaur', ring: 2, angle: 110 },
  { id: 11, name: 'Kabir Singh', ring: 2, angle: 290 },
  { id: 8, name: 'Tanvi Joshi', ring: 3, angle: 50 },
  { id: 6, name: 'Dev Malhotra', ring: 3, angle: 235 },
];

export default function Home() {
  const count = useSelector((s) => s.profiles.items.length);
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Meet people who share your orbit.</h1>
          <p>
            MatchVerse pairs you through the things you actually do - music, trails, code, cooking -
            so the first message is never "hey".
          </p>
          <div className="hero-actions">
            {isLoggedIn ? (
              <Link to="/discover" className="btn">Keep exploring, {user.name.split(' ')[0]}</Link>
            ) : (
              <>
                <Link to="/register" className="btn">Create your profile</Link>
                <Link to="/discover" className="btn btn-ghost">Browse first</Link>
              </>
            )}
          </div>
          <p className="muted">{count ? `${count} people nearby right now` : 'Finding people nearby'}</p>
        </div>
        <div className="orbit" aria-hidden="true">
          <div className="ring ring-1" /><div className="ring ring-2" /><div className="ring ring-3" />
          <div className="orbit-core">You</div>
          {DOTS.map((d) => (
            <div
              key={d.id}
              className="orbit-dot"
              style={{ transform: `rotate(${d.angle}deg) translate(${d.ring * 62}px) rotate(-${d.angle}deg)` }}
            >
              <Avatar profile={d} size={44} />
            </div>
          ))}
        </div>
      </section>

      <section className="steps">
        <div>
          <h2>Build a profile</h2>
          <p>Add your age, a short bio and at least two interests. Takes under a minute.</p>
        </div>
        <div>
          <h2>Like or pass</h2>
          <p>Search, filter by age and sort by distance. Likes are saved to your account.</p>
        </div>
        <div>
          <h2>Get a match</h2>
          <p>When someone you liked already likes you, it shows up under Matches.</p>
        </div>
      </section>
    </>
  );
}
