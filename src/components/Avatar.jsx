import { hueFor, initials } from '../utils/helpers';

export default function Avatar({ profile, size = 72 }) {
  const hue = hueFor(profile.id ?? profile.name);
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 50) % 360} 75% 45%))`,
      }}
      aria-hidden="true"
    >
      {initials(profile.name)}
    </div>
  );
}
