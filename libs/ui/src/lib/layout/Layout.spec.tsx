import { render } from '@testing-library/react';

import { Layout } from './Layout';

describe('Layout', () => {
  it('should render successfully', () => {
    const component = render(<Layout />).baseElement;

    expect(component).toBeTruthy();
  });

  it('should render with aside', () => {
    const renderResult = render(<Layout aside={<p>Aside</p>} />);
    const component = renderResult.baseElement;
    const query = renderResult.queryByTestId;

    expect(component).toBeTruthy();
    expect(query('layout-aside')).toBeTruthy();
  });

  it('should render without aside', () => {
    const renderResult = render(<Layout body={<p>Body</p>} />);
    const component = renderResult.baseElement;
    const query = renderResult.queryByTestId;

    expect(component).toBeTruthy();
    expect(query('layout-aside')).toBeFalsy();
    expect(query('layout-body')).toBeTruthy();
  });
});
