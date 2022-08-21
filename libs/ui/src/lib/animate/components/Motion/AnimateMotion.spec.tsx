import { render } from '@testing-library/react';
import { AnimateMotion } from './AnimateMotion';

describe('AnimateMotion', () => {
  it('should render', () => {
    const component = render(
      <AnimateMotion>
        <div></div>
      </AnimateMotion>
    ).baseElement;
    expect(component).toBeTruthy();
  });
});
