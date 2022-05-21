import { render } from '@testing-library/react';
import { TaskContainer } from './TaskContainer';

describe('TaskContainer', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(<TaskContainer />).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
