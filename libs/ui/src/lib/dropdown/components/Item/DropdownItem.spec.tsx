import { render } from '@testing-library/react';
import { DropdownItem } from './DropdownItem';

describe('DropdownItem', () => {
  const testProps = {
    item: {
      label: 'label',
      clickHandler: jest.fn(),
    },
    addDropdownItemRef: jest.fn(),
    dropdownToggler: jest.fn(),
    dropdownLabel: 'label',
  };

  it('should render successfully', () => {
    const component: HTMLElement = render(
      <DropdownItem {...testProps} />
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
