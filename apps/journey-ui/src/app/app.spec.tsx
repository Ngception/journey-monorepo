import { render, RenderResult } from '@testing-library/react';

import App from './app';

describe('App', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  beforeEach(() => {
    const renderResult: RenderResult = render(<App />);

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
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
