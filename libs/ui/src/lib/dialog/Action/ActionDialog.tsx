import { FC, FormEvent, ReactNode, RefObject } from 'react';
import FocusTrap from 'focus-trap-react';
import { Button } from '../../button';
import { setFadeOptions } from '../../constants';
import { AnimateMotion } from '../../animate';

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
        <AnimateMotion options={setFadeOptions('action', 0.125)}>
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
                <Button
                  testId="action-button"
                  color={props.actionButtonColor || 'primary'}
                  isDisabled={props.isActionDisabled}
                  isLoading={props.isLoading}
                  shouldSubmit={true}
                >
                  <span>{props.actionButtonLabel || 'OK'}</span>
                </Button>

                <Button
                  testId="cancel-button"
                  isDisabled={props.isLoading}
                  clickHandler={() => closeDialog()}
                >
                  <span>{props.cancelButtonLabel || 'Cancel'}</span>
                </Button>
              </footer>
            </form>
          </div>
        </AnimateMotion>
      </div>
    </FocusTrap>
  );
};
