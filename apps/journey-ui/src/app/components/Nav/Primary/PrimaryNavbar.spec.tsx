import { render } from '@testing-library/react';

import { PrimaryNavbar } from './PrimaryNavbar';

describe('PrimaryNavbar', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<PrimaryNavbar />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
