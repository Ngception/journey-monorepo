import {
  ErrorProvider,
  LayoutBody,
  LayoutHeader,
  NotificationContainer,
  NotificationProvider,
} from '@journey-monorepo/ui';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AuthProvider } from './shared/context/AuthContext';
import { AppRoutes } from './app.routes';
import { TaskProvider, UserProvider } from './shared';

import 'bulma/css/bulma.min.css';
import styles from './app.module.scss';

export function App() {
  return (
    <div>
      <AuthProvider>
        <NotificationProvider>
          <UserProvider>
            <TaskProvider>
              <ErrorProvider>
                <LayoutHeader>
                  <PrimaryNavbar />
                </LayoutHeader>
                <div className="column">
                  <LayoutBody>
                    <AppRoutes />
                  </LayoutBody>
                </div>
                <div className={styles['notification-container']}>
                  <NotificationContainer />
                </div>
              </ErrorProvider>
            </TaskProvider>
          </UserProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
