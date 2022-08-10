/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';
import { AuthProvider, TaskProvider } from '../../../shared';

import { PrimaryNavbar } from './PrimaryNavbar';

describe('PrimaryNavbar', () => {
  let component: HTMLElement;

  let query: any;
  let rerender: any;

  const originalWindow = global.window;

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <AuthProvider>
        <TaskProvider>
          <PrimaryNavbar />
        </TaskProvider>
      </AuthProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = renderResult.rerender;
  });

  afterAll(() => {
    restoreWindowLocation(originalWindow);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar brand', () => {
    expect(query('navbar-brand')).toBeTruthy();
  });

  describe('Is not logged in', () => {
    it('should not render search bar', () => {
      expect(query('task-search-filter-input')).toBeNull();
    });

    it('should not render account button', () => {
      expect(query('navbar-account-button')).toBeNull();
    });

    it('should not render logout button', () => {
      expect(query('navbar-logut-button')).toBeNull();
    });
  });

  describe('Is logged in', () => {
    beforeEach(() => {
      rerender(
        <AuthProvider initialState={{ isLoggedIn: true }}>
          <TaskProvider>
            <PrimaryNavbar />
          </TaskProvider>
        </AuthProvider>
      );
    });

    it('should render search bar', () => {
      expect(query('task-search-filter-input')).toBeTruthy();
    });

    it('should render account button', () => {
      expect(query('navbar-account-button')).toBeTruthy();
    });

    it('should render logout button', () => {
      expect(query('navbar-logout-button')).toBeTruthy();
    });
  });
});
