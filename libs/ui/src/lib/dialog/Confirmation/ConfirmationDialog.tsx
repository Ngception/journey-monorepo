import { FC, FormEvent, ReactNode, RefObject, useState } from 'react';
import FocusTrap from 'focus-trap-react';

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
  const confirmButtonClasses = `button ${
    props.confirmButtonColor ? props.confirmButtonColor : 'is-success'
  } ${props.isLoading ? 'is-loading' : undefined}`;
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
              <button
                data-testid="confirm-button"
                disabled={confirmField !== 'confirm' || props.isLoading}
                className={confirmButtonClasses}
                type="submit"
              >
                {props.confirmButtonLabel || 'Confirm'}
              </button>
              <button
                data-testid="cancel-button"
                className="button"
                type="button"
                disabled={props.isLoading}
                onClick={() => closeDialog()}
              >
                {props.cancelButtonLabel || 'Cancel'}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </FocusTrap>
  );
};
