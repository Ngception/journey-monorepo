import { render } from '@testing-library/react';
import { MockRouter } from '@journey-monorepo/ui';
import { AuthProvider } from '../../../shared';
import { PrimaryNavbar } from './PrimaryNavbar';

describe('PrimaryNavbar', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <PrimaryNavbar />
        </AuthProvider>
      </MockRouter>
    ).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
