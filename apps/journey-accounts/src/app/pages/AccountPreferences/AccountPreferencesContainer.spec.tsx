import { render } from '@testing-library/react';
import {
  ErrorProvider,
  MockRouter,
  NotificationProvider,
} from '@journey-monorepo/ui';
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
              <ErrorProvider>
                <AccountPreferencesContainer />
              </ErrorProvider>
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
