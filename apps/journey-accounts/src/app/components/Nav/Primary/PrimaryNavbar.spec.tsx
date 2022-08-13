/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ErrorProvider,
  MockRouter,
  NotificationProvider,
} from '@journey-monorepo/ui';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';
import {
  AuthProvider,
  logoutUser,
  useAuth,
  UserProvider,
} from '../../../shared';
import { PrimaryNavbar } from './PrimaryNavbar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('../../../shared/api/auth.handler', () => ({
  ...jest.requireActual('../../../shared/api/auth.handler'),
  logoutUser: jest.fn().mockResolvedValue({
    message: 'Success',
  }),
}));
describe('PrimaryNavbar', () => {
  let component: HTMLElement;
  let query: any;
  let rerender: any;

  const originalWindow = global.window;

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const renderResult = render(
      <AuthProvider>
        <ErrorProvider>
          <NotificationProvider>
            <UserProvider>
              <MockRouter route={'/'}>
                <PrimaryNavbar />
              </MockRouter>
            </UserProvider>
          </NotificationProvider>
        </ErrorProvider>
      </AuthProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = renderResult.rerender;
  });

  afterAll(() => {
    restoreWindowLocation(originalWindow);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
    expect(query('brand-button')).toBeTruthy();
  });

  it('should hide buttons if user is not logged in', () => {
    const logoutButton = query('logout-button');
    const backToBoardButton = query('back-to-board-button');

    expect(logoutButton).toBeFalsy();
    expect(backToBoardButton).toBeFalsy();
  });

  it('should logout user when clicking logout button if user is logged in', async () => {
    const mocked = { logoutUser, useAuth, useNavigate };

    rerender(
      <ErrorProvider>
        <NotificationProvider>
          <UserProvider>
            <MockRouter route={'/'}>
              <AuthProvider
                initialState={{
                  isLoggedIn: true,
                }}
              >
                <PrimaryNavbar />
              </AuthProvider>
            </MockRouter>
          </UserProvider>
        </NotificationProvider>
      </ErrorProvider>
    );

    const logoutButton = query('logout-button');
    expect(logoutButton).toBeTruthy();

    await userEvent.click(logoutButton);

    expect(mocked.logoutUser).toHaveBeenCalled();
  });

  it('should render back to board button', () => {
    rerender(
      <ErrorProvider>
        <NotificationProvider>
          <UserProvider>
            <MockRouter route={'/'}>
              <AuthProvider
                initialState={{
                  isLoggedIn: true,
                }}
              >
                <PrimaryNavbar />
              </AuthProvider>
            </MockRouter>
          </UserProvider>
        </NotificationProvider>
      </ErrorProvider>
    );

    expect(query('back-to-board-button')).toBeTruthy();
  });
});
