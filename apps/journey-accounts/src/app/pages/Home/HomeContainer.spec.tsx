import { render } from '@testing-library/react';
import { AuthProvider } from '../../shared';
import { HomeContainer } from './HomeContainer';
import { MockRouter } from '@journey-monorepo/ui';

describe('HomeContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <HomeContainer />
        </AuthProvider>
      </MockRouter>
    ).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
