import { LayoutAside, LayoutBody, LayoutHeader } from '@journey-monorepo/ui';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AsideNavbar } from './components/Nav/Aside/AsideNavbar';
import { AppRoutes } from './app.routes';

import 'bulma/css/bulma.min.css';

export function App() {
  // const userId = process.env['NX_TEST_USER_UUID'];
  const userId = null;

  return (
    <>
      <LayoutHeader>
        <PrimaryNavbar />
      </LayoutHeader>
      {userId ? (
        <div className="columns is-gapless">
          <div className="column is-one-fifth">
            <LayoutAside>
              <AsideNavbar />
            </LayoutAside>
          </div>
          <div className="column">
            <LayoutBody>
              <AppRoutes />
            </LayoutBody>
          </div>
        </div>
      ) : (
        <LayoutBody>
          <AppRoutes />
        </LayoutBody>
      )}
    </>
  );
}

export default App;
