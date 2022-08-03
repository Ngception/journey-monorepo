import { render, RenderResult } from '@testing-library/react';
import { useRef } from 'react';
import { DropdownTrigger } from './DropdownTrigger';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));
describe('DropdownTrigger', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const testProps = {
    text: 'text',
    icon: 'ellipsis-vertical',
    clickHandler: jest.fn(),
    dropdownTriggerRef: useRef(null),
    dropdownToggler: jest.fn(),
    dropdownLabel: 'label',
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <DropdownTrigger {...testProps} />
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {
    expect(query('dropdown-trigger-text')).toBeTruthy();
  });

  it('should render icon', () => {
    expect(query('dropdown-trigger-icon')).toBeTruthy();
  });
});
