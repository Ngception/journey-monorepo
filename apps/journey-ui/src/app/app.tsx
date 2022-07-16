import { LayoutBody, LayoutHeader } from '@journey-monorepo/ui';
import { PrimaryNavbar } from './components/Nav/Primary/PrimaryNavbar';
import 'bulma/css/bulma.min.css';
import { AuthProvider } from './shared/context/AuthContext';
import { AppRoutes } from './app.routes';

export function App() {
  return (
    <div>
      <AuthProvider>
        <LayoutHeader>
          <PrimaryNavbar />
        </LayoutHeader>
        <div className="column">
          <LayoutBody>
            <AppRoutes />
          </LayoutBody>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
