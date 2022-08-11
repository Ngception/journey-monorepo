/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockRouter } from '@journey-monorepo/ui';
import {
  createUser as createTestUser,
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';
import {
  AuthProvider,
  createUser,
  loginUser,
  UserProvider,
} from '../../../../shared';
import { HomeLogin } from './HomeLogin';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));
jest.mock('../../../shared/api/auth.handler', () => {
  const authHandlers = jest.requireActual(
    '../../../../shared/api/auth.handler'
  );
  const apiHandlers = jest.requireActual('../../../../shared/api/api.handler');

  return {
    ...authHandlers,
    ...apiHandlers,
    loginUser: jest.fn(),
    createUser: jest.fn(),
  };
});
describe('HomeLogin', () => {
  let component: HTMLElement;
  let query: any;
  let rerender: any;

  const originalWindow = global.window;
  const mocked = {
    loginUser,
    createUser,
  };
  const testCredentials = {
    email: 'email',
    password: 'password',
  };

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const homeLogin = (
      <MockRouter route={'/'}>
        <AuthProvider>
          <UserProvider>
            <HomeLogin />
          </UserProvider>
        </AuthProvider>
      </MockRouter>
    );

    const renderResult: RenderResult = render(homeLogin);

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;

    rerender = () => renderResult.rerender(homeLogin);
  });

  afterAll(() => {
    restoreWindowLocation(originalWindow);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
    expect(query('login-form')).toBeTruthy();
  });

  describe('should login and register', () => {
    beforeAll(() => {
      jest.spyOn(mocked, 'loginUser').mockResolvedValue({
        message: 'Success',
        user: createTestUser(),
      });

      jest.spyOn(mocked, 'createUser').mockResolvedValue({
        message: 'Success',
        user: createTestUser(),
      });
    });

    it('should login user', async () => {
      const emailField = query('email-field');
      const passwordField = query('password-field');
      const submitButton = query('submit-button');

      await userEvent.type(emailField, 'email');
      await userEvent.type(passwordField, 'password');
      await userEvent.click(submitButton);

      rerender();

      expect(mocked.loginUser).toHaveBeenCalledWith(testCredentials);
      expect(query('error-message')).toBeNull();
    });

    it('should register user', async () => {
      const emailField = query('email-field');
      const passwordField = query('password-field');
      const submitButton = query('submit-button');
      const toggleAuthButton = query('toggle-auth');

      await userEvent.click(toggleAuthButton);
      await userEvent.type(emailField, 'email');
      await userEvent.type(passwordField, 'password');
      await userEvent.click(submitButton);

      rerender();

      expect(mocked.createUser).toHaveBeenCalledWith(testCredentials);
      expect(query('error-message')).toBeNull();
    });
  });

  describe('should display error', () => {
    beforeAll(() => {
      jest.spyOn(mocked, 'loginUser').mockRejectedValue(new Error());
      jest.spyOn(mocked, 'createUser').mockRejectedValue(new Error());
    });

    it('should display error on failed login', async () => {
      const emailField = query('email-field');
      const passwordField = query('password-field');
      const submitButton = query('submit-button');

      expect(query('error-message')).toBeNull();

      await userEvent.type(emailField, 'email');
      await userEvent.type(passwordField, 'password');
      await userEvent.click(submitButton);

      rerender();

      expect(mocked.loginUser).toHaveBeenCalledWith(testCredentials);
      expect(query('error-message')).toBeTruthy();
    });

    it('should display error on failed registration', async () => {
      const emailField = query('email-field');
      const passwordField = query('password-field');
      const submitButton = query('submit-button');
      const toggleAuthButton = query('toggle-auth');

      expect(query('error-message')).toBeNull();

      await userEvent.click(toggleAuthButton);
      await userEvent.type(emailField, 'email');
      await userEvent.type(passwordField, 'password');
      await userEvent.click(submitButton);

      rerender();

      expect(mocked.createUser).toHaveBeenCalledWith(testCredentials);
      expect(query('error-message')).toBeTruthy();
    });
  });
});
