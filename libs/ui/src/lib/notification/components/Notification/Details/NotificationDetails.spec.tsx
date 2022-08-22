import { render, RenderResult } from '@testing-library/react';
import { NotificationProvider } from '../../../context/NotificationContext';
import { INotification } from '../../../';
import { NotificationDetails } from './NotificationDetails';

describe('NotificationDetails', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const mockNotification = {
    message: 'message',
    type: 'success',
  } as INotification;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <NotificationProvider>
        <NotificationDetails notification={mockNotification} index={0} />
      </NotificationProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(query('notification-details')).toBeTruthy();
  });
});
