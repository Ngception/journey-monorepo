import { render } from '@testing-library/react';

import { LayoutAside } from './LayoutAside';

describe('LayoutAside', () => {
  it('should render', () => {
    const { baseElement } = render(<LayoutAside />);

    expect(baseElement).toBeTruthy();
  });
});
