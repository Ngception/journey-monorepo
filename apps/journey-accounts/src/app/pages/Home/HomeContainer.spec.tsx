/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { AuthProvider } from '../../shared';
import { HomeContainer } from './HomeContainer';
import { MockRouter } from '@journey-monorepo/ui';

describe('HomeContainer', () => {
  let component: HTMLElement;
  let query: any;

  beforeEach(() => {
    const renderResult = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <HomeContainer />
        </AuthProvider>
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
    expect(query('home-container')).toBeTruthy();
  });
});
