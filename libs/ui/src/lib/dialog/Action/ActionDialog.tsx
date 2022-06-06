import { FC, FormEvent, ReactNode, RefObject } from 'react';
import FocusTrap from 'focus-trap-react';

interface ActionDialogProps {
  title: string;
  trigger?: RefObject<HTMLButtonElement>;
  isDialogOpen: boolean;
  isLoading?: boolean;
  isActionDisabled?: boolean;
  children: ReactNode;
  actionButtonLabel: string;
  actionButtonColor?: string;
  actionHandler: (event: FormEvent) => void;
  cancelButtonLabel?: string;
  cancelHandler: () => void;
}

export const ActionDialog: FC<ActionDialogProps> = (
  props: ActionDialogProps
) => {
  const actionButtonClasses = `button ${
    props.actionButtonColor ? props.actionButtonColor : 'is-primary'
  } ${props.isLoading ? 'is-loading' : undefined}`;

  const closeDialog = () => {
    props.cancelHandler();
    props?.trigger?.current?.focus();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.actionHandler(event);
  };

  return (
    <FocusTrap
      active={props.isDialogOpen}
      focusTrapOptions={{
        fallbackFocus: '#close-dialog-button',
        delayInitialFocus: false,
      }}
    >
      <div data-testid="action-dialog" className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <form onSubmit={(event) => handleSubmit(event)}>
            <header className="modal-card-head">
              <h2 className="modal-card-title">{props.title}</h2>
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
            <section className="modal-card-body">{props.children}</section>
            <footer className="modal-card-foot">
              <button
                data-testid="action-button"
                className={actionButtonClasses}
                type="submit"
                disabled={props.isActionDisabled}
              >
                {props.actionButtonLabel || 'OK'}
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
