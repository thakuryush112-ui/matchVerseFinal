import { INTERESTS } from '../utils/helpers';

// Reusable multi-select chips (controlled by parent form state).
export default function InterestPicker({ value, onChange, error, touched }) {
  const toggle = (item) =>
    onChange(value.includes(item) ? value.filter((i) => i !== item) : [...value, item]);

  return (
    <fieldset className={`field ${touched && error ? 'has-error' : ''}`}>
      <legend>Interests</legend>
      <div className="chips">
        {INTERESTS.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${value.includes(item) ? 'chip-on' : ''}`}
            aria-pressed={value.includes(item)}
            onClick={() => toggle(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {touched && error && <small className="error-text">{error}</small>}
    </fieldset>
  );
}
