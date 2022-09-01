/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockRouter } from '@journey-monorepo/ui';
import {
  createUser as createTestUser,
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';
import { AuthProvider, createUser, UserProvider } from '../../../../shared';
import { HomeRegistration } from './HomeRegistration';

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
    createUser: jest.fn(),
  };
});
describe('HomeRegistration', () => {
  let component: HTMLElement;
  let query: any;
  let rerender: any;

  const originalWindow = global.window;
  const mocked = {
    createUser,
  };
  const testCredentials = {
    email: 'email',
    password: 'abcABC123!@#',
  };

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const homeLogin = (
      <MockRouter route={'/'}>
        <AuthProvider>
          <UserProvider>
            <HomeRegistration />
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
    expect(query('register-form')).toBeTruthy();
  });

  it('should register user if password passes validation', async () => {
    jest.spyOn(mocked, 'createUser').mockResolvedValue({
      message: 'Success',
      user: createTestUser(),
    });

    const emailField = query('email-field');
    const passwordField = query('password-field');
    const submitButton = query('submit-button');

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);
    await userEvent.click(submitButton);

    rerender();

    expect(mocked.createUser).toHaveBeenCalledWith(testCredentials);
    expect(query('error-message')).toBeNull();
  });

  it('should not allow registration if password fails validation', async () => {
    const emailField = query('email-field');
    const passwordField = query('password-field');
    const submitButton = query('submit-button');

    await userEvent.type(emailField, 'email');
    await userEvent.type(passwordField, 'password');

    rerender();

    expect(submitButton.disabled).toEqual(true);
    expect(query('error-message')).toBeNull();
  });

  it('should display error on failed registration', async () => {
    jest.spyOn(mocked, 'createUser').mockRejectedValue(new Error());

    const emailField = query('email-field');
    const passwordField = query('password-field');
    const submitButton = query('submit-button');

    expect(query('error-message')).toBeNull();

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);
    await userEvent.click(submitButton);

    rerender();

    expect(mocked.createUser).toHaveBeenCalledWith(testCredentials);
    expect(query('error-message')).toBeTruthy();
  });
});
