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
  let component: HTMLElement, query: any, rerender: any;

  const testUser = {
    user_id: 'uuid',
    email: 'email',
    created_at: new Date(),
  };

  beforeEach(() => {
    const securityEditPassword = (
      <MockRouter route={'/'}>
        <AuthProvider>
          <NotificationProvider>
            <UserProvider initialState={testUser}>
              <SecurityEditPassword />
            </UserProvider>
          </NotificationProvider>
        </AuthProvider>
      </MockRouter>
    );

    const renderResult: RenderResult = render(securityEditPassword);

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = () => renderResult.rerender(securityEditPassword);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { updateUser };
    jest.spyOn(mocked, 'updateUser');

    const newPasswordField = query('new-password-field');
    const openConfirmDialogButton = query('open-confirm-dialog-button');

    expect(openConfirmDialogButton.disabled).toEqual(true);
    expect(query('confirm-change-password-dialog')).toBeNull();

    await userEvent.type(newPasswordField, 'newPassword');

    expect(openConfirmDialogButton.disabled).toEqual(false);

    await userEvent.click(openConfirmDialogButton);

    rerender();

    const confirmField = query('confirm-field');
    const dialogConfirmButton = query('confirm-button');

    expect(query('confirm-change-password-dialog')).toBeTruthy();
    expect(confirmField).toBeTruthy();

    await userEvent.type(confirmField, 'confirm');
    await userEvent.click(dialogConfirmButton);

    expect(mocked.updateUser).toHaveBeenCalledWith({
      user_id: 'uuid',
      password: 'newPassword',
    });
  });
});
