import { forwardRef } from 'react';

// Reusable input: text-like inputs, textarea and select in one component.
const InputField = forwardRef(function InputField(
  { label, name, as = 'input', error, touched, hint, options = [], children, ...rest },
  ref,
) {
  const showError = touched && error;
  const id = `field-${name}`;
  const common = {
    id,
    name,
    ref,
    'aria-invalid': showError ? 'true' : 'false',
    'aria-describedby': showError ? `${id}-error` : hint ? `${id}-hint` : undefined,
    ...rest,
  };

  let control;
  if (as === 'textarea') control = <textarea rows="3" {...common} />;
  else if (as === 'select') {
    control = (
      <select {...common}>
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  } else control = <input {...common} />;

  return (
    <div className={`field ${showError ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {control}
      {children}
      {hint && !showError && <small id={`${id}-hint`}>{hint}</small>}
      {showError && <small id={`${id}-error`} className="error-text">{error}</small>}
    </div>
  );
});

export default InputField;
