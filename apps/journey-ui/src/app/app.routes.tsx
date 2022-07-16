import { ErrorBoundary, Loader } from '@journey-monorepo/ui';
import { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './components/Auth/AuthGuard';

const TaskContainer = lazy(() =>
  import('./components/Task/TaskContainer').then(({ TaskContainer }) => ({
    default: TaskContainer,
  }))
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppRoutesProps {}

export const AppRoutes: FC<AppRoutesProps> = (props: AppRoutesProps) => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <TaskContainer />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />}></Route>
      </Route>
    </Routes>
  );
};
