import { renderHook, act } from '@testing-library/react-hooks';

import { useResizableContainer } from './useResizableContainer';
import { fireEvent } from '@testing-library/react';

describe('useResizableContainer', () => {
  it('returns isResizing and startResizing', () => {
    const { result } = renderHook(() => useResizableContainer());
    expect(result.current.isResizing).toEqual(false);

    act(() => {
      result.current.startResizing();
    });
    expect(result.current.isResizing).toEqual(true);
  });

  it('returns an empty container', () => {
    const { result } = renderHook(() => useResizableContainer());
    const { container } = result.current;
    expect(container.current).toEqual(null);
  });

  describe('when resizing', () => {
    let mockContainer;
    let maxWidth;
    let minWidth;
    let result;

    beforeEach(() => {
      mockContainer = {
        style: {
          width: '300px',
        },
      };
      maxWidth = 800;
      minWidth = 200;
      const { result: renderHookResult } = renderHook(() =>
        useResizableContainer({ maxWidth, minWidth })
      );
      result = renderHookResult;
      act(() => {
        result.current.startResizing();
      });
      result.current.container.current = mockContainer;
    });

    it('applies a new width on the container when pointer moves', () => {
      act(() => {
        // window.innerWidth = 1024 - 624 = newWidth
        fireEvent(
          document,
          new window.FakeMouseEvent('pointermove', { pageX: 624 })
        );
      });
      expect(mockContainer.style.width).toEqual('400px');
    });

    it('does not go above the max width specified', () => {
      act(() => {
        // window.innerWidth = 1024 - 124 = newWidth
        // newWidth > 800
        fireEvent(
          document,
          new window.FakeMouseEvent('pointermove', { pageX: 124 })
        );
      });
      expect(mockContainer.style.width).toEqual(`${maxWidth}px`);
    });

    it('does not go below the min width specified', () => {
      act(() => {
        // window.innerWidth = 1024 - 924 = newWidth
        // newWidth < 200
        fireEvent(
          document,
          new window.FakeMouseEvent('pointermove', { pageX: 924 })
        );
      });
      expect(mockContainer.style.width).toEqual(`${minWidth}px`);
    });

    it('stops resizing when pointer goes up', () => {
      act(() => {
        fireEvent.pointerUp(document);
      });
      expect(result.current.isResizing).toEqual(false);

      act(() => {
        // window.innerWidth = 1024 - 624 = newWidth
        fireEvent(
          document,
          new window.FakeMouseEvent('pointermove', { pageX: 624 })
        );
      });
      expect(mockContainer.style.width).not.toEqual('400px');
    });
  });
});
