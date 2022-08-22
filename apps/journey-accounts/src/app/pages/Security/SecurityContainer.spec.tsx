import {
  ErrorProvider,
  MockRouter,
  NotificationProvider,
} from '@journey-monorepo/ui';
import { render } from '@testing-library/react';
import { AuthProvider, UserProvider } from '../../shared';
import { SecurityContainer } from './SecurityContainer';

describe('SecurityContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <NotificationProvider>
            <UserProvider>
              <ErrorProvider>
                <SecurityContainer />
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
