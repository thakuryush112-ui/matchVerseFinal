import { useState } from 'react';

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active);
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={t.id === active}
            className={t.id === active ? 'tab tab-on' : 'tab'}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">{current.content}</div>
    </div>
  );
}
