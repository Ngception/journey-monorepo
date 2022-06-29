import { render, RenderResult } from '@testing-library/react';
import { Notification } from '../../../shared';
import { NotificationDetails } from './NotificationDetails';

describe('NotificationDetails', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const mockNotification = {
    message: 'message',
    type: 'success',
  } as Notification;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <NotificationDetails notification={mockNotification} />
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(query('notification-details')).toBeTruthy();
  });
});
