import { render, RenderResult } from '@testing-library/react';
import { AddTask } from './AddTask';

describe('AddTask', () => {
  let component: HTMLElement;

  const testProps = {
    title: 'test',
    userId: 'uuid',
    fetchTasks: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(<AddTask {...testProps} />);

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
