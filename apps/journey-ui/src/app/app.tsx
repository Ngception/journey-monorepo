import { lazy, Suspense } from 'react';
import {
  ErrorBoundary,
  LayoutBody,
  LayoutHeader,
  Loader,
} from '@journey-monorepo/ui';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import 'bulma/css/bulma.min.css';

const TaskContainer = lazy(() =>
  import('./components/Task/TaskContainer').then(({ TaskContainer }) => ({
    default: TaskContainer,
  }))
);

export function App() {
  return (
    <>
      <LayoutHeader>
        <PrimaryNavbar />
      </LayoutHeader>
      <div className="column">
        <LayoutBody>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <TaskContainer />
            </Suspense>
          </ErrorBoundary>
        </LayoutBody>
      </div>
    </>
  );
}

export default App;
