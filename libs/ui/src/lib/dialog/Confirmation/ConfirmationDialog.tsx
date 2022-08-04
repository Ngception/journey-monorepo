import { FC, FormEvent, ReactNode, RefObject, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { Button } from '../../button';

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
  const modalClasses = `modal ${props.isDialogOpen ? 'is-active' : undefined}`;
  const notificationClasses = `notification ${
    props.showWarning ? 'is-warning' : undefined
  } ${props.showDanger ? 'is-danger' : undefined}`;

  const closeDialog = () => {
    props.cancelHandler();
    props?.trigger?.current?.focus();
  };

  return (
    <FocusTrap
      active={props.isDialogOpen}
      focusTrapOptions={{
        fallbackFocus: '#close-dialog-button',
        delayInitialFocus: false,
      }}
    >
      <div className={modalClasses}>
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
          <form onSubmit={(event) => props.confirmHandler(event)}>
            <section className="modal-card-body">
              <div className={notificationClasses}>{props.children}</div>
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
      </div>
    </FocusTrap>
  );
};
