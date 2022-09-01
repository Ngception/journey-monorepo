import { render, RenderResult } from '@testing-library/react';
import { PasswordValidator } from './PasswordValidator';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('PasswordValidator', () => {
  let component: HTMLElement, query: any, rerender: any;

  const testProps = {
    password: '',
    onValidPasswordHandler: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <PasswordValidator {...testProps} />
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = () =>
      renderResult.rerender(<PasswordValidator {...testProps} />);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render password strength bar', () => {
    expect(query('pw-strength-bar')).toBeTruthy();
  });

  it('should render password criteria text', () => {
    expect(query('pw-criteria-text')).toBeTruthy();
  });

  it('should render weak password indicator', () => {
    expect(query('weak-pw-indicator')).toBeTruthy();
    expect(query('medium-pw-indicator')).toBeNull();
    expect(query('strong-pw-indicator')).toBeNull();
  });

  it('should render medium password indicator', () => {
    testProps.password = 'abcABC';

    rerender();

    expect(query('weak-pw-indicator')).toBeNull();
    expect(query('medium-pw-indicator')).toBeTruthy();
    expect(query('strong-pw-indicator')).toBeNull();
  });

  it('should render strong password indicator', () => {
    testProps.password = 'abcABC123!@#';

    rerender();

    expect(query('weak-pw-indicator')).toBeNull();
    expect(query('medium-pw-indicator')).toBeNull();
    expect(query('strong-pw-indicator')).toBeTruthy();
  });
});
