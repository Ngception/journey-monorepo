import {
  DialogContainer,
  // DialogContainer,
  DialogProvider,
  ErrorProvider,
  LayoutHeader,
  NotificationContainer,
  NotificationProvider,
} from '@journey-monorepo/ui';
import { AuthProvider, UserProvider } from './shared';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AppRoutes } from './app.routes';

import 'bulma/css/bulma.min.css';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles['app-container']}>
      <AuthProvider>
        <NotificationProvider>
          <DialogProvider>
            <UserProvider>
              <ErrorProvider>
                <LayoutHeader>
                  <PrimaryNavbar />
                </LayoutHeader>
                <AppRoutes />
                <div className={styles['notification-container']}>
                  <NotificationContainer />
                </div>
                <DialogContainer />
              </ErrorProvider>
            </UserProvider>
          </DialogProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
