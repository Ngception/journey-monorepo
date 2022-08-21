import { render } from '@testing-library/react';
import { Animate } from './Animate';

describe('Animate', () => {
  it('should render', () => {
    const component = render(
      <Animate>
        <div></div>
      </Animate>
    ).baseElement;
    expect(component).toBeTruthy();
  });
});
