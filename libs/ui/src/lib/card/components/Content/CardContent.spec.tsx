/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { CardContent } from './CardContent';

describe('CardContent', () => {
  it('should render CardContent', () => {
    const component = render(
      <CardContent>
        <div></div>
      </CardContent>
    ).baseElement;

    expect(component).toBeTruthy();
  });
});
