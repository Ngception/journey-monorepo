// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'bulma/css/bulma.min.css';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
      <div className="buttons">
        <button className="button is-primary">Primary</button>
        <button className="button is-link">Link</button>
      </div>

      <div className="buttons">
        <button className="button is-info">Info</button>
        <button className="button is-success">Success</button>
        <button className="button is-warning">Warning</button>
        <button className="button is-danger">Danger</button>
      </div>
      <NxWelcome title="journey-ui" />
      <div />
    </>
  );
}

export default App;
