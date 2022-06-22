import { MockRouter } from '@journey-monorepo/ui';
import { render } from '@testing-library/react';
import { AuthProvider, UserProvider } from '../../shared';

import { AccountPreferencesContainer } from './AccountPreferencesContainer';

describe('AccountPreferencesContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <UserProvider>
            <AccountPreferencesContainer />
          </UserProvider>
        </AuthProvider>
      </MockRouter>
    ).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
