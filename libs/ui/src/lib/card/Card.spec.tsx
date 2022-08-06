/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  const testProps = {
    content: <div></div>,
  };
  it('should render card', () => {
    const component = render(
      <Card {...testProps}>
        <span>Click</span>
      </Card>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
