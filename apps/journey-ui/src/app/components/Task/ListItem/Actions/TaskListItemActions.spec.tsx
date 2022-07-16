import { render, RenderResult } from '@testing-library/react';
import { createTask } from '@journey-monorepo/util';
import { TaskListItemActions } from './TaskListItemActions';

describe('TaskListItemActions', () => {
  let component: HTMLElement;

  const testProps = {
    task: createTask(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <TaskListItemActions {...testProps} />
    );
    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
