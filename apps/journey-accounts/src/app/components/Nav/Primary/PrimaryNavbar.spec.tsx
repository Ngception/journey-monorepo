/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockRouter } from '@journey-monorepo/ui';
import { AuthProvider, logoutUser, useAuth } from '../../../shared';
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

  beforeEach(() => {
    const renderResult = render(
      <AuthProvider>
        <MockRouter route={'/'}>
          <PrimaryNavbar />
        </MockRouter>
      </AuthProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = renderResult.rerender;
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
      <MockRouter route={'/'}>
        <AuthProvider
          initialState={{
            isLoggedIn: true,
          }}
        >
          <PrimaryNavbar />
        </AuthProvider>
      </MockRouter>
    );

    const logoutButton = query('logout-button');
    expect(logoutButton).toBeTruthy();

    await userEvent.click(logoutButton);

    expect(mocked.logoutUser).toHaveBeenCalled();
  });

  it('should render back to board button', () => {
    rerender(
      <MockRouter route={'/'}>
        <AuthProvider
          initialState={{
            isLoggedIn: true,
          }}
        >
          <PrimaryNavbar />
        </AuthProvider>
      </MockRouter>
    );

    expect(query('back-to-board-button')).toBeTruthy();
  });
});
