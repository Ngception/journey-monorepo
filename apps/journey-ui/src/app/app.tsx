import {
  LayoutBody,
  LayoutHeader,
  NotificationContainer,
  NotificationProvider,
} from '@journey-monorepo/ui';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AuthProvider } from './shared/context/AuthContext';
import { AppRoutes } from './app.routes';
import { UserProvider } from './shared';

import 'bulma/css/bulma.min.css';
import styles from './app.module.scss';

export function App() {
  return (
    <div>
      <AuthProvider>
        <NotificationProvider>
          <UserProvider>
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
          </UserProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
