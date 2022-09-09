import { MockRouter } from '@journey-monorepo/ui';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requestUserPasswordReset } from '../../../../shared';
import { HomeRequestPasswordReset } from './HomeRequestPasswordReset';

jest.mock('../../../../shared/api/auth.handler', () => ({
  ...jest.requireActual('../../../../shared/api/auth.handler'),
  requestUserPasswordReset: jest.fn(),
}));
describe('HomeRequestPasswordReset', () => {
  let component: HTMLElement, query: any;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <MockRouter route="\">
        <HomeRequestPasswordReset />
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { requestUserPasswordReset },
      mockEmail = 'hello@email.com',
      emailField = query('email-field'),
      submitButton = query('submit-button');

    jest.spyOn(mocked, 'requestUserPasswordReset');

    expect(emailField).toBeTruthy();

    await userEvent.type(emailField, mockEmail);
    await userEvent.click(submitButton);

    expect(mocked.requestUserPasswordReset).toHaveBeenCalledWith(mockEmail);
  });
});
