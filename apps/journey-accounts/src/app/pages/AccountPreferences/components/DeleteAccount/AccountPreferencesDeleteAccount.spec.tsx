/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockRouter } from '@journey-monorepo/ui';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, deleteUser, UserProvider } from '../../../../shared';
import { AccountPreferencesDeleteAccount } from './AccountPreferencesDeleteAccount';

// Mock utils module to be able mock certain methods
jest.mock('../../../../shared', () => ({
  ...jest.requireActual('../../../../shared'),
  deleteUser: jest.fn().mockResolvedValue({ message: 'success' }),
}));
describe('AccountPreferencesDeleteAccount', () => {
  let component: HTMLElement;
  let query: any;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <UserProvider>
            <AccountPreferencesDeleteAccount />
          </UserProvider>
        </AuthProvider>
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should delete account', async () => {
    const mocked = { deleteUser };

    const deleteAccountDialogTrigger = query('delete-account-dialog-trigger');

    expect(deleteAccountDialogTrigger).toBeTruthy();

    await userEvent.click(deleteAccountDialogTrigger);

    const confirmButton = query('confirm-button');

    expect(confirmButton).toBeTruthy();
    expect(confirmButton.disabled).toEqual(true);

    await userEvent.type(query('confirm-field'), 'confirm');

    expect(confirmButton.disabled).toEqual(false);

    await userEvent.click(confirmButton);

    expect(mocked.deleteUser).toHaveBeenCalled();
  });
});
