import { render } from '@testing-library/react';

import { AccountPreferencesDeleteAccount } from './AccountPreferencesDeleteAccount';

describe('AccountPreferencesDeleteAccount', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<AccountPreferencesDeleteAccount />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
