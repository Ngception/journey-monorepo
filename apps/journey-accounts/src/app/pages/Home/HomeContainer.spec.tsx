import { render } from '@testing-library/react';
import { HomeContainer } from './HomeContainer';

describe('HomeContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<HomeContainer />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
