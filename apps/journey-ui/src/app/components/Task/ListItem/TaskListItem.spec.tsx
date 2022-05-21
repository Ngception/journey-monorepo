import { createTasks } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import { TaskListItem } from './TaskListItem';

describe('TaskListItem', () => {
  let component: HTMLElement;

  beforeEach(() => {
    const item = createTasks()[0];
    const renderResult: RenderResult = render(<TaskListItem item={item} />);

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
