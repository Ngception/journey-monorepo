/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  const testProps = {
    shouldSubmit: false,
    clickHandler: jest.fn(),
  };

  it('should render button', () => {
    const component = render(
      <Button {...testProps}>
        <span>Click</span>
      </Button>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
