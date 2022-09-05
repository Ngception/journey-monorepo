import { render } from '@testing-library/react';
import { ProfileDetails } from './ProfileDetails';

describe('ProfileDetails', () => {
  let component: HTMLElement;

  const testProps = {
    email: 'email',
    createdAt: new Date().toDateString(),
  };

  beforeEach(() => {
    component = render(<ProfileDetails {...testProps} />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
