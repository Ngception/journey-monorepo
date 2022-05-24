import { render } from '@testing-library/react';
import { SecurityContainer } from './SecurityContainer';

describe('SecurityContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<SecurityContainer />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
