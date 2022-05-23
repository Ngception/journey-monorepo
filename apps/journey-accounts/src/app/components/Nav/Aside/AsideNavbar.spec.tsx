import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AsideNavbar } from './AsideNavbar';

describe('AsideNavbar', () => {
  let component: HTMLElement;
  let history: MemoryHistory;

  const pages = ['profile', 'security', 'account-preferences'];

  const createRouter = (route: string) => {
    history = createMemoryHistory({
      initialEntries: [route],
    });

    component = render(
      <Router location={history.location} navigator={history}>
        <AsideNavbar />
      </Router>
    ).baseElement;
  };

  it('should render', () => {
    createRouter('');

    expect(component).toBeTruthy();
  });

  pages.forEach((page) => {
    it(`should navigate to ${page} page`, () => {
      createRouter(`/${page}`);

      userEvent.click(screen.getByTestId(`${page}-link`));

      expect(history.location.pathname).toBe(`/${page}`);
    });
  });
});
