import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <div className="card" data-testid="card">
      {props.children}
    </div>
  );
};
