import {
  ErrorProvider,
  LayoutHeader,
  Notification,
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
          <UserProvider>
            <ErrorProvider>
              <LayoutHeader>
                <PrimaryNavbar />
              </LayoutHeader>
              <AppRoutes />
              <div className={styles['notification-container']}>
                <Notification />
              </div>
            </ErrorProvider>
          </UserProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
