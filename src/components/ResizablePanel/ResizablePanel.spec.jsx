import React from 'react';
import {
  cleanup,
  render,
  screen,
  act,
  fireEvent,
} from '@testing-library/react';

import { ResizablePanel } from './ResizablePanel';

afterEach(cleanup);

describe('ResizablePanel', () => {
  it('renders a handle and some content', () => {
    render(<ResizablePanel />);
    expect(screen.getByTitle('Resize')).toBeInTheDocument();
    expect(screen.getByText('Resizable Panel')).toBeInTheDocument();
  });

  describe('Resize Handling', () => {
    it('does not resize until pointer is down on the resize handle', () => {
      render(<ResizablePanel />);
      const sidePanel = screen.getByTestId('side-panel');
      act(() => {
        // window.innerWidth = 1024 - 624 = newWidth
        fireEvent(
          document,
          new window.FakeMouseEvent('pointermove', { pageX: 624 })
        );
      });
      expect(sidePanel).not.toHaveStyle({ width: '400px' });

      const resizeHandle = screen.getByTitle('Resize');
      act(() => {
        fireEvent.pointerDown(resizeHandle);
      });

      act(() => {
        // window.innerWidth = 1024 - 624 = newWidth
        fireEvent(
          document,
          new window.FakeMouseEvent('pointermove', { pageX: 624 })
        );
      });
      expect(sidePanel).toHaveStyle({ width: '400px' });
    });

    describe('when resizing', () => {
      beforeEach(() => {
        render(<ResizablePanel />);
        const resizeHandle = screen.getByTitle('Resize');
        act(() => {
          fireEvent.pointerDown(resizeHandle);
        });
      });

      it('does not make the panel wider than 50% width of the screen', () => {
        const sidePanel = screen.getByTestId('side-panel');
        act(() => {
          // window.innerWidth = 1024 - 424 = 600 > 512
          // newWidth > 1024/2 = 512
          fireEvent(
            document,
            new window.FakeMouseEvent('pointermove', { pageX: 424 })
          );
        });

        expect(sidePanel).toHaveStyle({ width: `${window.innerWidth / 2}px` });
      });

      it('does not make the panel narrower than 19*16px', () => {
        const sidePanel = screen.getByTestId('side-panel');
        act(() => {
          // 19 * 16 = 304
          // newWidth < 304
          // window.innerWidth = 1024 - 924 < 304
          fireEvent(
            document,
            new window.FakeMouseEvent('pointermove', { pageX: 924 })
          );
        });

        expect(sidePanel).toHaveStyle({ width: `${19 * 16}px` });
      });

      it('stops resizing when pointer goes up', () => {
        act(() => {
          fireEvent.pointerUp(document);
        });
        act(() => {
          // window.innerWidth = 1024 - 624 = newWidth
          fireEvent(
            document,
            new window.FakeMouseEvent('pointermove', { pageX: 624 })
          );
        });

        const sidePanel = screen.getByTestId('side-panel');
        expect(sidePanel).not.toHaveStyle({ width: '400px' });
      });
    });
  });
});
