import { render } from '@testing-library/react';
import { ErrorProvider } from '../..';
import { MockRouter } from '../../../testing';
import { ErrorOutlet } from './ErrorOutlet';

describe('ErrorOutlet', () => {
  it('should render', () => {
    const component = render(
      <ErrorProvider>
        <MockRouter route={'/'}>
          <ErrorOutlet />
        </MockRouter>
      </ErrorProvider>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
