import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import useForm from '../hooks/useForm';
import { validateLogin } from '../utils/validators';
import InputField from '../components/InputField';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin,
  );

  const onValid = (v) => {
    try {
      const user = login(v.email, v.password);
      showToast(`Welcome back, ${user.name.split(' ')[0]}`, 'success');
      navigate(location.state?.from || '/discover', { replace: true });
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <section className="form-page">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onValid)} noValidate>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <InputField label="Email" name="email" type="email" autoComplete="email"
          value={values.email} onChange={handleChange} onBlur={handleBlur}
          error={errors.email} touched={touched.email} />
        <InputField label="Password" name="password" type="password" autoComplete="current-password"
          value={values.password} onChange={handleChange} onBlur={handleBlur}
          error={errors.password} touched={touched.password} />
        <button type="submit" className="btn">Log in</button>
      </form>
      <p className="muted">New here? <Link to="/register">Create an account</Link></p>
    </section>
  );
}
