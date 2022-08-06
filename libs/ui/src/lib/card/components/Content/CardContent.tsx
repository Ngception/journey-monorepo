import { FC, ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
}

export const CardContent: FC<CardContentProps> = (props: CardContentProps) => {
  return (
    <div className="card-content" data-testid="card-content">
      {props.children}
    </div>
  );
};
