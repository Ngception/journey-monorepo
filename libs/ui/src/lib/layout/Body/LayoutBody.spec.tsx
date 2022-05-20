import { render } from '@testing-library/react';

import { LayoutBody } from './LayoutBody';

describe('LayoutBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutBody />);

    expect(baseElement).toBeTruthy();
  });
});
