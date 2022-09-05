import { useEffect } from 'react';
import {
  ErrorProvider,
  LayoutBody,
  LayoutHeader,
  Notification,
  NotificationProvider,
  SkipLink,
} from '@journey-monorepo/ui';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AuthProvider } from './shared/context/AuthContext';
import { AppRoutes } from './app.routes';
import { TaskProvider, UserProvider } from './shared';

import 'bulma/css/bulma.min.css';
import styles from './app.module.scss';

export function App() {
  useEffect(() => {
    const header = document.querySelector('.layout-header') as HTMLElement;

    header?.focus();
  }, []);

  const skipToMainContent = () => {
    const content = document.querySelector('.columns');
    const focusableSelectors =
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])';

    let focusableElements: NodeListOf<HTMLElement>;

    if (content) {
      focusableElements = content?.querySelectorAll(focusableSelectors);

      if (focusableElements.length) {
        focusableElements[0]?.focus();
        return;
      }
    }
  };

  return (
    <div>
      <AuthProvider>
        <NotificationProvider>
          <UserProvider>
            <TaskProvider>
              <ErrorProvider>
                <LayoutHeader>
                  <div className={styles['skip-link']}>
                    <SkipLink clickHandler={skipToMainContent}>
                      Skip to main content
                    </SkipLink>
                  </div>
                  <PrimaryNavbar />
                </LayoutHeader>
                <div className={`column ${styles['layout-body']}`}>
                  <LayoutBody>
                    <AppRoutes />
                  </LayoutBody>
                </div>
                <div className={styles['notification-container']}>
                  <Notification />
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
