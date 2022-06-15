/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockRouter } from '@journey-monorepo/ui';
import { AuthProvider, loginUser } from '../../../../shared';
import { HomeLogin } from './HomeLogin';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));
jest.mock('../../../shared/api/auth.handler', () => ({
  ...jest.requireActual('../../../../shared/api/auth.handler'),
  loginUser: jest.fn().mockResolvedValue({
    message: 'Success',
  }),
}));
describe('HomeLogin', () => {
  let component: HTMLElement;
  let query: any;

  beforeEach(() => {
    const renderResult = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <HomeLogin />
        </AuthProvider>
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
    expect(query('login-form')).toBeTruthy();
  });

  it('should login user', async () => {
    const mocked = { loginUser };
    const emailField = query('email-field');
    const passwordField = query('password-field');
    const submitButton = query('submit-button');

    await userEvent.type(emailField, 'email');
    await userEvent.type(passwordField, 'password');
    await userEvent.click(submitButton);

    expect(mocked.loginUser).toHaveBeenCalled();
  });
});
