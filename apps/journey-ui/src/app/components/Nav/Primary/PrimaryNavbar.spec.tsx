import { render, RenderResult } from '@testing-library/react';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';
import { AuthProvider } from '../../../shared';

import { PrimaryNavbar } from './PrimaryNavbar';

describe('PrimaryNavbar', () => {
  let component: HTMLElement;

  const originalWindow = global.window;

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <AuthProvider>
        <PrimaryNavbar />
      </AuthProvider>
    );

    component = renderResult.baseElement;
  });

  afterAll(() => {
    restoreWindowLocation(originalWindow);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
