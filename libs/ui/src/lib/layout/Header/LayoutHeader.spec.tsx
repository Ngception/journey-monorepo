import { render } from '@testing-library/react';

import { LayoutHeader } from './LayoutHeader';

describe('LayoutHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutHeader />);

    expect(baseElement).toBeTruthy();
  });
});
