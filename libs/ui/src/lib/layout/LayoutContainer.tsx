import { FC, ReactNode } from 'react';
import { LayoutAside } from './Aside/LayoutAside';
import { LayoutBody } from './Body/LayoutBody';
import { LayoutHeader } from './Header/LayoutHeader';

interface LayoutContainerProps {
  aside?: ReactNode;
  primaryNavbar?: ReactNode;
  body?: ReactNode;
}

export const LayoutContainer: FC<LayoutContainerProps> = (
  props: LayoutContainerProps
) => {
  return (
    <div>
      {props.primaryNavbar && (
        <LayoutHeader>{props.primaryNavbar}</LayoutHeader>
      )}
      <LayoutBody>
        {props.aside ? (
          <div data-testid="with-aside" className="columns is-gapless">
            <div className="column is-one-fifth">
              <LayoutAside>{props.aside}</LayoutAside>
            </div>
            <div className="column">{props.body}</div>
          </div>
        ) : (
          <div data-testid="no-aside">{props.body}</div>
        )}
      </LayoutBody>
    </div>
  );
};
