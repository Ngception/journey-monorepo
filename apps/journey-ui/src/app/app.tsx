import {
  DialogContainer,
  DialogProvider,
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
          <DialogProvider>
            <UserProvider>
              <TaskProvider>
                <ErrorProvider>
                  <LayoutHeader>
                    <PrimaryNavbar />
                  </LayoutHeader>
                  <div className={`column ${styles['layout-body']}`}>
                    <LayoutBody>
                      <AppRoutes />
                    </LayoutBody>
                  </div>
                  <div className={styles['notification-container']}>
                    <NotificationContainer />
                  </div>
                  <div>
                    <DialogContainer />
                  </div>
                </ErrorProvider>
              </TaskProvider>
            </UserProvider>
          </DialogProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
