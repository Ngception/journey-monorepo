import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrimaryNavbarProps {}

export const PrimaryNavbar: FC<PrimaryNavbarProps> = (
  props: PrimaryNavbarProps
) => {
  return (
    <nav className="navbar" role="navigation" aria-label="primary navigation">
      <div className="navbar-brand">
        <a href="#" className="navbar-item">
          Brand
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a href="#" className="button is-primary">
              <strong>My account</strong>
            </a>
            <a href="#" className="button is-light">
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
