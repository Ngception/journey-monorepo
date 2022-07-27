import { render, RenderResult } from '@testing-library/react';
import { NotificationProvider } from '../../context/NotificationContext';
import { NotificationContainer } from './NotificationContainer';

describe('NotificationContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <NotificationProvider>
        <NotificationContainer />
      </NotificationProvider>
    );

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
