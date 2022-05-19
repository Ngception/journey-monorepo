// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import 'semantic-ui-css/semantic.min.css';
import NxWelcome from './nx-welcome';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

export function App() {
  return (
    <>
      <Loader active={true} />
      <NxWelcome title="journey-ui" />
      <div />
    </>
  );
}

export default App;
