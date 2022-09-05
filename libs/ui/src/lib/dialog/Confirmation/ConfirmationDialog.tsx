import { FC, FormEvent, ReactNode, RefObject, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { AnimateMotion } from '../../animate';
import { Button } from '../../button';
import { setFadeOptions } from '../../constants';

import styles from './ConfirmationDialog.module.scss';

interface ConfirmationDialogProps {
  title: string;
  showWarning?: boolean;
  showDanger?: boolean;
  trigger?: RefObject<HTMLButtonElement>;
  isDialogOpen: boolean;
  isLoading?: boolean;
  children: ReactNode;
  confirmButtonLabel?: string;
  confirmButtonColor?: string;
  confirmHandler: (event: FormEvent) => void;
  cancelButtonLabel?: string;
  cancelHandler: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = (
  props: ConfirmationDialogProps
) => {
  const [confirmField, setConfirmField] = useState<string>('');

  const closeDialog = () => {
    props.cancelHandler();
    props?.trigger?.current?.focus();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (confirmField !== 'confirm') {
      return;
    }

    props.confirmHandler(event);
  };

  const setNotificationClasses = () => {
    let classes = 'notification';

    if (props.showWarning) {
      classes += ' is-warning';
    }

    if (props.showDanger) {
      classes += ' is-danger';
    }

    return classes;
  };

  return (
    <FocusTrap
      active={props.isDialogOpen}
      focusTrapOptions={{
        fallbackFocus: '#close-dialog-button',
        delayInitialFocus: false,
      }}
    >
      <div className="modal is-active">
        <AnimateMotion options={setFadeOptions('confirmation', 0.125)}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{props.title}</p>
              <button
                data-testid="close-dialog-button"
                id="close-dialog-button"
                className="delete"
                type="button"
                aria-label="close"
                disabled={props.isLoading}
                onClick={() => closeDialog()}
              ></button>
            </header>
            <form onSubmit={handleSubmit}>
              <section className="modal-card-body">
                <div className={setNotificationClasses()}>{props.children}</div>
                <div className={styles['confirm-field']}>
                  <label htmlFor="confirm-field">
                    Please type "confirm" to proceed.
                  </label>
                  <input
                    data-testid="confirm-field"
                    className="input"
                    type="text"
                    id="confirm-field"
                    aria-required="true"
                    onChange={(e) =>
                      setConfirmField(e.target.value.toLowerCase())
                    }
                  />
                </div>
              </section>
              <footer className="modal-card-foot">
                <Button
                  color={props.confirmButtonColor || 'success'}
                  testId="confirm-button"
                  isDisabled={confirmField !== 'confirm' || props.isLoading}
                  isLoading={props.isLoading}
                  shouldSubmit={true}
                >
                  <span>{props.confirmButtonLabel || 'Confirm'}</span>
                </Button>

                <Button
                  testId="cancel-button"
                  isDisabled={props.isLoading}
                  clickHandler={() => closeDialog()}
                >
                  <span> {props.cancelButtonLabel || 'Cancel'}</span>
                </Button>
              </footer>
            </form>
          </div>
        </AnimateMotion>
      </div>
    </FocusTrap>
  );
};
