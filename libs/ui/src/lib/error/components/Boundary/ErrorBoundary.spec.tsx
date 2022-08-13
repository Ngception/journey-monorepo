import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render', () => {
    const component = render(
      <ErrorBoundary>
        <div></div>
      </ErrorBoundary>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
