import { LayoutAside, LayoutBody, LayoutHeader } from '@journey-monorepo/ui';
import { ProfileContainer } from './pages/Profile/ProfileContainer';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AsideNavbar } from './components/Nav/Aside/AsideNavbar';

import 'bulma/css/bulma.min.css';

export function App() {
  return (
    <>
      <LayoutHeader>
        <PrimaryNavbar />
      </LayoutHeader>
      <div className="columns is-gapless">
        <div className="column is-one-fifth">
          <LayoutAside>
            <AsideNavbar />
          </LayoutAside>
        </div>
        <div className="column">
          <LayoutBody>
            <ProfileContainer />
          </LayoutBody>
        </div>
      </div>
    </>
  );
}

export default App;
