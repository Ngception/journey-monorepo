import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockRouter, NotificationProvider } from '@journey-monorepo/ui';
import { HomeResetPassword } from './HomeResetPassword';
import { resetUserPassword } from '../../../../shared';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';

jest.mock('../../../../shared/api/auth.handler', () => ({
  ...jest.requireActual('../../../../shared/api/auth.handler'),
  resetUserPassword: jest.fn(),
}));
describe('HomeResetPassword', () => {
  let component: HTMLElement, query: any;
  const originalWindow = global.window;

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <MockRouter route="/?token=abc123">
        <NotificationProvider>
          <HomeResetPassword />
        </NotificationProvider>
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  afterAll(() => {
    restoreWindowLocation(originalWindow);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { resetUserPassword },
      passwordField = query('password-field'),
      submitButton = query('submit-button'),
      password = 'abcABC123!@#';

    jest.spyOn(mocked, 'resetUserPassword');

    expect(passwordField).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toEqual(true);

    await userEvent.type(passwordField, password);

    expect(submitButton.disabled).toEqual(false);

    await userEvent.click(submitButton);

    expect(mocked.resetUserPassword).toHaveBeenCalledWith('abc123', {
      password,
    });
  });
});
