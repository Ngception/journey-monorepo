import {
  ErrorProvider,
  LayoutHeader,
  Notification,
  NotificationProvider,
  SkipLink,
} from '@journey-monorepo/ui';
import { AuthProvider, UserProvider } from './shared';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AppRoutes } from './app.routes';

import 'bulma/css/bulma.min.css';
import styles from './app.module.scss';
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    const header = document.querySelector('.layout-header') as HTMLElement;

    header?.focus();
  }, []);

  const skipToMainContent = () => {
    const content = document.querySelector('.main-content');
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

    const aside = document.querySelector('.layout-aside');

    if (aside) {
      focusableElements = aside?.querySelectorAll(focusableSelectors);

      if (focusableElements.length) {
        focusableElements[0]?.focus();
      }
    }
  };

  return (
    <div className={styles['app-container']}>
      <AuthProvider>
        <NotificationProvider>
          <UserProvider>
            <ErrorProvider>
              <LayoutHeader>
                <div className={styles['skip-link']}>
                  <SkipLink clickHandler={skipToMainContent}>
                    Skip to main content
                  </SkipLink>
                </div>
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
