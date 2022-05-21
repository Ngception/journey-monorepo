import { createTaskLists } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import { TaskList } from './TaskList';

describe('TaskList', () => {
  let component: HTMLElement;

  beforeEach(() => {
    const list = createTaskLists()[0];
    const renderResult: RenderResult = render(<TaskList list={list} />);

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
