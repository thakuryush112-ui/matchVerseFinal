import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <div className="state-box">
      <h1>404 - Page not found</h1>
      <p>Nothing lives at <code>{pathname}</code>.</p>
      <Link to="/" className="btn">Go home</Link>
    </div>
  );
}
