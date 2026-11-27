import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import useForm from '../hooks/useForm';
import { validateRegister } from '../utils/validators';
import InputField from '../components/InputField';
import InterestPicker from '../components/InterestPicker';

const GENDERS = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'nonbinary', label: 'Non-binary' },
];

const INITIAL = {
  name: '', email: '', age: '', gender: '', password: '', confirm: '',
  bio: '', interests: [], terms: false,
};

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');
  const nameRef = useRef(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useForm(
    INITIAL,
    validateRegister,
  );

  const onValid = (v) => {
    try {
      const user = register(v);
      showToast(`Welcome to MatchVerse, ${user.name.split(' ')[0]}`, 'success');
      navigate('/discover');
    } catch (err) {
      setFormError(err.message);
    }
  };

  const onInvalid = (errs) => {
    // Move focus to the first invalid field for keyboard / screen-reader users.
    const first = Object.keys(errs)[0];
    if (first === 'name') nameRef.current?.focus();
    else document.getElementById(`field-${first}`)?.focus();
  };

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: errors[name],
    touched: touched[name],
  });

  return (
    <section className="form-page">
      <h1>Create your profile</h1>
      <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <InputField label="Full name" ref={nameRef} autoComplete="name" {...field('name')} />
        <InputField label="Email" type="email" autoComplete="email" {...field('email')} />
        <div className="two-col">
          <InputField label="Age" type="number" min="18" max="99" {...field('age')} />
          <InputField label="Gender" as="select" options={GENDERS} {...field('gender')} />
        </div>
        <InputField label="Password" type="password" autoComplete="new-password"
          hint="At least 8 characters with a letter and a number" {...field('password')} />
        <InputField label="Confirm password" type="password" autoComplete="new-password" {...field('confirm')} />
        <InputField label="Short bio" as="textarea" hint={`${values.bio.length}/150 characters`} {...field('bio')} />
        <InterestPicker
          value={values.interests}
          onChange={(list) => setFieldValue('interests', list)}
          error={errors.interests}
          touched={touched.interests || values.interests.length > 0}
        />
        <label className="check">
          <input type="checkbox" name="terms" checked={values.terms} onChange={handleChange} onBlur={handleBlur} />
          I am 18 or older and accept the terms
        </label>
        {touched.terms && errors.terms && <small className="error-text">{errors.terms}</small>}
        <button type="submit" className="btn">Create account</button>
      </form>
      <p className="muted">Already a member? <Link to="/login">Log in</Link></p>
    </section>
  );
}
