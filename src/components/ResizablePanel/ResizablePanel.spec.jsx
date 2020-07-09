import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { ResizablePanel } from './ResizablePanel';

afterEach(cleanup);

describe('ResizablePanel', () => {
  it('renders a handle and some content', () => {
    render(<ResizablePanel />);
    expect(screen.getByTitle('Resize')).toBeInTheDocument();
    expect(screen.getByText('Resizable Panel')).toBeInTheDocument();
  });
});

