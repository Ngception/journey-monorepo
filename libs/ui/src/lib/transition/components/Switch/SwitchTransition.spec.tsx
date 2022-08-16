import { render } from '@testing-library/react';
import { SwitchTransition } from './SwitchTransition';

describe('SwitchTransition', () => {
  it('should render', () => {
    const component = render(
      <SwitchTransition>
        <div></div>
      </SwitchTransition>
    );

    expect(component).toBeTruthy();
  });
});
