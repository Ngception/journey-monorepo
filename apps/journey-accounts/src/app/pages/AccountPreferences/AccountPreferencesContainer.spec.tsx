import { MockRouter, NotificationProvider } from '@journey-monorepo/ui';
import { render } from '@testing-library/react';
import { AuthProvider, UserProvider } from '../../shared';

import { AccountPreferencesContainer } from './AccountPreferencesContainer';

describe('AccountPreferencesContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <NotificationProvider>
            <UserProvider>
              <AccountPreferencesContainer />
            </UserProvider>
          </NotificationProvider>
        </AuthProvider>
      </MockRouter>
    ).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
