import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from './Spinner';

// Shared page shell: every route renders inside <Outlet />.
export default function Layout() {
  return (
    <div className="shell">
      <Navbar />
      <main className="container">
        <Suspense fallback={<Spinner label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="footer">MatchVerse - Front End Engineering-II project, Chitkara University</footer>
    </div>
  );
}
