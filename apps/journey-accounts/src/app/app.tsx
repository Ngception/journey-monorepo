import { LayoutHeader } from '@journey-monorepo/ui';
import { AuthProvider } from './shared';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import { AppRoutes } from './app.routes';

import 'bulma/css/bulma.min.css';

export function App() {
  return (
    <div>
      <AuthProvider>
        <LayoutHeader>
          <PrimaryNavbar />
        </LayoutHeader>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
