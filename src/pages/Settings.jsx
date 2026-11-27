import { useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { resetSwipes } from '../store/likesSlice';
import useForm from '../hooks/useForm';
import { validateProfile } from '../utils/validators';
import InputField from '../components/InputField';
import InterestPicker from '../components/InterestPicker';

const GENDERS = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'nonbinary', label: 'Non-binary' },
];

export default function Settings() {
  const dispatch = useDispatch();
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useForm(
    { name: user.name, age: String(user.age), gender: user.gender, bio: user.bio, interests: user.interests },
    validateProfile,
  );

  const onValid = (v) => {
    updateProfile(v);
    showToast('Profile saved', 'success');
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
      <h1>Your profile</h1>
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <InputField label="Full name" {...field('name')} />
        <div className="two-col">
          <InputField label="Age" type="number" min="18" max="99" {...field('age')} />
          <InputField label="Gender" as="select" options={GENDERS} {...field('gender')} />
        </div>
        <InputField label="Short bio" as="textarea" hint={`${values.bio.length}/150 characters`} {...field('bio')} />
        <InterestPicker
          value={values.interests}
          onChange={(list) => setFieldValue('interests', list)}
          error={errors.interests}
          touched
        />
        <button type="submit" className="btn">Save changes</button>
      </form>
      <hr />
      <h2>Reset likes</h2>
      <p className="muted">Clears everyone you liked or passed so they appear on Discover again.</p>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => { dispatch(resetSwipes()); showToast('Likes and passes cleared', 'info'); }}
      >
        Reset likes and passes
      </button>
    </section>
  );
}
