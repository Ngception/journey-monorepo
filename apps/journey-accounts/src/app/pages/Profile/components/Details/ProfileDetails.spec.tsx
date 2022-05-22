import { render } from '@testing-library/react';

import { ProfileDetails } from './ProfileDetails';

describe('ProfileDetails', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<ProfileDetails />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
