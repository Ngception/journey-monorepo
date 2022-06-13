import { render } from '@testing-library/react';
import { AuthProvider } from '../../../../shared';
import { HomeLogin } from './HomeLogin';
import { MockRouter } from '@journey-monorepo/ui';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));
describe('HomeLogin', () => {
  let component: HTMLElement;

  beforeEach(() => {
    component = render(
      <MockRouter route={'/'}>
        <AuthProvider>
          <HomeLogin />
        </AuthProvider>
      </MockRouter>
    ).baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
