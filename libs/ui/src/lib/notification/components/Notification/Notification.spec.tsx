import { render, RenderResult } from '@testing-library/react';
import { NotificationProvider } from '../../context/NotificationContext';
import { Notification } from './Notification';

describe('Notification', () => {
  let component: HTMLElement;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <NotificationProvider>
        <Notification />
      </NotificationProvider>
    );

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
