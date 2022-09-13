/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockRouter } from '@journey-monorepo/ui';
import {
  createUser as createTestUser,
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';
import { AuthProvider, loginUser, UserProvider } from '../../../../shared';
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
  };
});
describe('HomeLogin', () => {
  let component: HTMLElement;
  let query: any;
  let rerender: any;

  const originalWindow = global.window;
  const mocked = {
    loginUser,
  };
  const testCredentials = {
    email: 'hello@email.com',
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

  it('should login user', async () => {
    jest
      .spyOn(mocked, 'loginUser')
      .mockImplementation(jest.fn())
      .mockResolvedValue({
        message: 'Success',
        user: createTestUser(),
      });

    const emailField = query('email-field'),
      passwordField = query('password-field'),
      submitButton = query('submit-button');

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);
    await userEvent.click(submitButton);

    rerender();

    expect(mocked.loginUser).toHaveBeenCalledWith(testCredentials);
    expect(query('error-message')).toBeNull();
  });

  it('should display error on failed login', async () => {
    jest
      .spyOn(mocked, 'loginUser')
      .mockImplementation(jest.fn())
      .mockRejectedValue(new Error());

    const emailField = query('email-field'),
      passwordField = query('password-field'),
      submitButton = query('submit-button');
    let errorMessage = query('error-message');

    expect(errorMessage).toBeNull();

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);
    await userEvent.click(submitButton);

    rerender();

    errorMessage = query('error-message');

    expect(mocked.loginUser).toHaveBeenCalledWith(testCredentials);
    expect(query('error-message')).toBeTruthy();
  });
});
