import { render } from '@testing-library/react';
import { SecurityEditPassword } from './SecurityEditPassword';

describe('SecurityEditPassword', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<SecurityEditPassword />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
