import { render } from '@testing-library/react';
import { AuthProvider, UserProvider } from '../../shared';
import { ProfileContainer } from './ProfileContainer';

describe('ProfileContainer', () => {
  let component: HTMLElement;

  const mockState = {
    email: 'email',
    user_id: 'uuid',
    created_at: new Date(),
  };

  beforeEach(() => {
    component = render(
      <AuthProvider>
        <UserProvider initialState={mockState}>
          <ProfileContainer />
        </UserProvider>
      </AuthProvider>
    ).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
