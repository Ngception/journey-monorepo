import { render } from '@testing-library/react';
import { HomeLogin } from './HomeLogin';

describe('HomeLogin', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<HomeLogin />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
