import { render } from '@testing-library/react';

import { AccountPreferencesContainer } from './AccountPreferencesContainer';

describe('AccountPreferencesContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<AccountPreferencesContainer />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
