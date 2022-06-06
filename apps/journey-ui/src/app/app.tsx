// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LayoutAside, LayoutBody, LayoutHeader } from '@journey-monorepo/ui';

import 'bulma/css/bulma.min.css';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { TaskContainer } from './components/Task/TaskContainer';

export function App() {
  return (
    <>
      <LayoutHeader>
        <PrimaryNavbar />
      </LayoutHeader>
      <div className="column">
        <LayoutBody>
          <TaskContainer />
        </LayoutBody>
      </div>
    </>
  );
}

export default App;
