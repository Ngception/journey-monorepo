import { render } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  const testProps = {
    items: [],
    label: 'label',
  };

  it('should render successfully', () => {
    const component: HTMLElement = render(
      <Dropdown {...testProps} />
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
