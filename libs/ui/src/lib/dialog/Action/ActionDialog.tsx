import { FC, ReactNode, RefObject } from 'react';
import FocusTrap from 'focus-trap-react';

interface ActionDialogProps {
  title: string;
  trigger?: RefObject<HTMLButtonElement>;
  isDialogOpen: boolean;
  children: ReactNode;
  actionButtonLabel: string;
  actionButtonColor?: string;
  actionHandler: () => void;
  cancelButtonLabel?: string;
  cancelHandler: () => void;
}

export const ActionDialog: FC<ActionDialogProps> = (
  props: ActionDialogProps
) => {
  const actionButtonClasses = `button ${
    props.actionButtonColor ? props.actionButtonColor : 'is-primary'
  }`;

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
      <div className="modal is-active">
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
              onClick={() => closeDialog()}
            ></button>
          </header>
          <section className="modal-card-body">{props.children}</section>
          <footer className="modal-card-foot">
            <button
              data-testid="action-button"
              className={actionButtonClasses}
              type="button"
              onClick={() => props.actionHandler()}
            >
              {props.actionButtonLabel || 'OK'}
            </button>
            <button
              data-testid="cancel-button"
              className="button"
              type="button"
              onClick={() => closeDialog()}
            >
              {props.cancelButtonLabel || 'Cancel'}
            </button>
          </footer>
        </div>
      </div>
    </FocusTrap>
  );
};
