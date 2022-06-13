import { FC, ReactNode } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

interface MockRouterProps {
  route: string;
  children: ReactNode;
}

export const MockRouter: FC<MockRouterProps> = (props: MockRouterProps) => {
  const history = createMemoryHistory({
    initialEntries: [props.route],
  });

  return (
    <Router location={history.location} navigator={history}>
      {props.children}
    </Router>
  );
};
