import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

const profile = {
  id: 1, name: 'Aanya Sharma', age: 24, gender: 'woman', city: 'Chandigarh',
  distanceKm: 3, bio: 'Weekend trekker.', interests: ['Travel', 'Hiking'], likesYou: true,
};

describe('ProfileCard', () => {
  it('renders details and fires like / pass callbacks', async () => {
    const onLike = vi.fn();
    const onPass = vi.fn();
    render(
      <MemoryRouter>
        <ProfileCard profile={profile} isLiked={false} onLike={onLike} onPass={onPass} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Aanya Sharma, 24')).toBeInTheDocument();
    expect(screen.getByText('Travel')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(onLike).toHaveBeenCalledWith(profile);
    await userEvent.click(screen.getByRole('button', { name: 'Pass' }));
    expect(onPass).toHaveBeenCalledWith(1);
  });
});
