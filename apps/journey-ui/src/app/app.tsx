// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LayoutAside, LayoutBody, LayoutHeader } from '@journey-monorepo/ui';

import 'bulma/css/bulma.min.css';

export function App() {
  return (
    <>
      <LayoutHeader />
      <div className="columns is-gapless">
        <div className="column is-one-third">
          <LayoutAside />
        </div>
        <div className="column">
          <LayoutBody />
        </div>
      </div>
    </>
  );
}

export default App;
