import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLikedProfiles, selectMutualProfiles } from '../store/likesSlice';

// Parent of the nested routes /matches/mutual and /matches/liked.
export default function MatchesLayout() {
  const mutual = useSelector(selectMutualProfiles).length;
  const liked = useSelector(selectLikedProfiles).length;
  return (
    <section>
      <h1>Matches</h1>
      <div className="subnav">
        <NavLink to="mutual">Mutual ({mutual})</NavLink>
        <NavLink to="liked">People you liked ({liked})</NavLink>
      </div>
      <Outlet />
    </section>
  );
}
