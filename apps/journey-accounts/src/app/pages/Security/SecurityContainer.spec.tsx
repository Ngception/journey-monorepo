import { MockRouter } from '@journey-monorepo/ui';
import { render } from '@testing-library/react';
import { AuthProvider, NotificationProvider, UserProvider } from '../../shared';
import { SecurityContainer } from './SecurityContainer';

describe('SecurityContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <NotificationProvider>
            <UserProvider>
              <SecurityContainer />
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
