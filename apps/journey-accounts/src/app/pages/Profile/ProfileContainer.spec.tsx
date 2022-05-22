import { render } from '@testing-library/react';

import { ProfileContainer } from './ProfileContainer';

describe('ProfileContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<ProfileContainer />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
