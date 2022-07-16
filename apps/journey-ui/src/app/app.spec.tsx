import { render, RenderResult } from '@testing-library/react';
import { MockRouter } from '@journey-monorepo/ui';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@journey-monorepo/util';

import App from './app';

describe('App', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const originalWindow = global.window;

  beforeAll(() => {
    mockWindowLocation();
  });

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <MockRouter route={'/'}>
        <App />
      </MockRouter>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  afterAll(() => {
    restoreWindowLocation(originalWindow);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    expect(query('layout-header')).toBeTruthy();
  });

  // it('should render aside', () => {
  //   expect(query('layout-aside')).toBeTruthy();
  // });

  it('should render body', () => {
    expect(query('layout-body')).toBeTruthy();
  });
});
