import { render } from '@testing-library/react';
import { Message } from './Message';

describe('Message', () => {
  const testProps = {
    color: 'primary',
  };

  it('should render', () => {
    const component = render(
      <Message {...testProps}>
        <div></div>
      </Message>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
