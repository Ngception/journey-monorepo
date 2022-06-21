import { LayoutHeader } from '@journey-monorepo/ui';
import { AuthProvider, UserProvider } from './shared';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AppRoutes } from './app.routes';

import 'bulma/css/bulma.min.css';

export function App() {
  return (
    <div>
      <AuthProvider>
        <UserProvider>
          <LayoutHeader>
            <PrimaryNavbar />
          </LayoutHeader>
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
