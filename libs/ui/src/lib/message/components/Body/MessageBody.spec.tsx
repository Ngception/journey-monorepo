import { render } from '@testing-library/react';
import { MessageBody } from './MessageBody';

describe('MessageBody', () => {
  it('should render', () => {
    const component = render(
      <MessageBody>
        <div></div>
      </MessageBody>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
