import { useCallback, useState } from 'react';

// Reusable controlled-form hook: values, validation, touched state, submit.
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const runValidation = useCallback((next) => {
    const result = validate(next);
    setErrors(result);
    return result;
  }, [validate]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      runValidation(next);
      return next;
    });
  }, [runValidation]);

  const handleChange = useCallback((e) => {
    const { name, type, value, checked } = e.target;
    setFieldValue(name, type === 'checkbox' ? checked : value);
  }, [setFieldValue]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = (onValid, onInvalid) => (e) => {
    e.preventDefault();
    const result = runValidation(values);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(result).length === 0) onValid(values);
    else if (onInvalid) onInvalid(result);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, reset };
}
