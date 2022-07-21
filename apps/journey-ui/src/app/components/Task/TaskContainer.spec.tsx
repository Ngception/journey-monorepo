/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import { UserProvider } from '../../shared';
import { TaskContainer } from './TaskContainer';

describe('TaskContainer', () => {
  let component: HTMLElement;
  let query: any;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <UserProvider>
        <TaskContainer />
      </UserProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByText;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 default columns for To Do, In Progress, and Done', () => {
    const columns = ['To Do', 'In Progress', 'Done'];

    columns.forEach((column) => expect(query(column)).toBeTruthy());
  });
});
