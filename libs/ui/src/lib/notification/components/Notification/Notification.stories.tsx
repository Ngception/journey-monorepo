import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FC } from 'react';
import { Button } from '../../../button';
import { NotificationProvider } from '../../context/NotificationContext';
import { useNotification } from '../../hook/useNotification';
import { Notification } from './Notification';

export default {
  title: 'Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Demo: FC = () => {
  const {
    showSuccessNotification,
    showErrorNotification,
    showInfoNotification,
  } = useNotification();

  return (
    <>
      <Button
        color="success"
        clickHandler={() => showSuccessNotification('Success')}
      >
        Show success
      </Button>
      <span className="mx-2">
        <Button
          color="danger"
          clickHandler={() => showErrorNotification('Error')}
        >
          Show error
        </Button>
      </span>
      <Button color="info" clickHandler={() => showInfoNotification('Info')}>
        Show info
      </Button>
      <Notification />
    </>
  );
};

export const Default: ComponentStory<typeof NotificationProvider> = (_args) => (
  <NotificationProvider>
    <Demo />
  </NotificationProvider>
);
