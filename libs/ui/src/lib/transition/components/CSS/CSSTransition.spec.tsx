import { render } from '@testing-library/react';
import { CSSTransition } from './CSSTransition';

describe('CSSTransition', () => {
  const testProps = {
    shouldTransition: true,
    duration: 500,
    classNames: {
      enter: 'enter',
      enterActive: 'enter-active',
      exit: 'exit',
      exitActive: 'exit-active',
    },
  };

  it('should render', () => {
    const component = render(
      <CSSTransition {...testProps}>
        <div></div>
      </CSSTransition>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
