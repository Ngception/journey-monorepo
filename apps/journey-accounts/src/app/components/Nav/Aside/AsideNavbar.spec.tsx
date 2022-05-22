import { render } from '@testing-library/react';

import { AsideNavbar } from './AsideNavbar';

describe('AsideNavbar', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<AsideNavbar />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
