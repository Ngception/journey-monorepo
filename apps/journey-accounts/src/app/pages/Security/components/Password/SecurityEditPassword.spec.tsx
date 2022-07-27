/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockRouter, NotificationProvider } from '@journey-monorepo/ui';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, updateUser, UserProvider } from '../../../../shared';
import { SecurityEditPassword } from './SecurityEditPassword';

// Mock utils module to be able mock certain methods
jest.mock('../../../../shared', () => {
  const originalModule = jest.requireActual('../../../../shared');

  return {
    ...originalModule,
    updateUser: jest.fn().mockResolvedValue({ message: 'success' }),
  };
});
describe('SecurityEditPassword', () => {
  let component: HTMLElement;
  let query: any;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <NotificationProvider>
            <UserProvider>
              <SecurityEditPassword />
            </UserProvider>
          </NotificationProvider>
        </AuthProvider>
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { updateUser };
    jest.spyOn(mocked, 'updateUser');

    const currentPasswordField = query('current-password-field');
    const newPasswordField = query('new-password-field');
    const submitButton = query('submit-button');

    expect(submitButton.disabled).toEqual(true);

    await userEvent.type(currentPasswordField, 'currentPassword');
    await userEvent.type(newPasswordField, 'newPassword');

    expect(submitButton.disabled).toEqual(false);

    await userEvent.click(submitButton);

    expect(mocked.updateUser).toHaveBeenCalled();
  });
});
