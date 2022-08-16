import { render } from '@testing-library/react';
import { TransitionGroup } from './TransitionGroup';

describe('TransitionGroup', () => {
  it('should render', () => {
    const component = render(
      <TransitionGroup>
        <div></div>
      </TransitionGroup>
    );

    expect(component).toBeTruthy();
  });
});
