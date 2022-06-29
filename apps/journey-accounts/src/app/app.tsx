import { LayoutHeader } from '@journey-monorepo/ui';
import { AuthProvider, UserProvider } from './shared';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AppRoutes } from './app.routes';

import 'bulma/css/bulma.min.css';
import styles from './app.module.scss';
import { NotificationProvider } from './shared/context/NotificationContext';
import { NotificationContainer } from './components/Notification/NotificationContainer';

export function App() {
  return (
    <div className={styles['app-container']}>
      <AuthProvider>
        <NotificationProvider>
          <UserProvider>
            <LayoutHeader>
              <PrimaryNavbar />
            </LayoutHeader>
            <AppRoutes />
            <div className={styles['notification-container']}>
              <NotificationContainer />
            </div>
          </UserProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
