import { render } from '@testing-library/react';
import { GeneralError } from './GeneralError';

describe('GeneralError', () => {
  it('should render', () => {
    const component = render(<GeneralError />).baseElement;

    expect(component).toBeTruthy();
  });
});
