import React, { useCallback, useRef, useEffect, useState } from 'react';

import {
  SidePanel,
  MenuTitle,
  Typography,
  ChevronLeft,
} from '@mott-macdonald/smi-react-ui-kit';

import './ResizablePanel.scss';

export const ResizablePanel = () => {
  const panel = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const handleResize = useCallback((e) => {
    if (!panel.current) {
      return;
    }

    e.preventDefault();

    const maxWidth = window.innerWidth / 2;
    const minWidth = 19 * 16; // 19rem
    let newWidth = window.innerWidth - e.pageX; // right side panel only

    if (newWidth >= maxWidth) {
      newWidth = maxWidth;
    }
    if (newWidth <= minWidth) {
      newWidth = minWidth;
    }

    panel.current.style.width = `${newWidth}px`;
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return undefined;
    }

    document.addEventListener('pointermove', handleResize);
    document.addEventListener('pointerup', stopResizing);

    return () => {
      document.removeEventListener('pointermove', handleResize);
      document.removeEventListener('pointerup', stopResizing);
    };
  }, [handleResize, isResizing, stopResizing]);

  return (
    <SidePanel className="resizable-panel" ref={panel} data-testid="side-panel">
      <div
        className="resize-handle"
        title="Resize"
        role="button"
        onPointerDown={startResizing}
      >
        <ChevronLeft />
      </div>
      <div className="side-panel-content">
        <MenuTitle className="panel-heading-section">
          <Typography variant="h4" secondary noWrap>
            Resizable Panel
          </Typography>
        </MenuTitle>
        <SidePanel.Section>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </SidePanel.Section>
        <SidePanel.Section>
          <Typography>
            Nullam ac tortor vitae purus. In aliquam sem fringilla ut morbi
            tincidunt augue. Dui faucibus in ornare quam. Ipsum nunc aliquet
            bibendum enim facilisis gravida neque. Facilisis leo vel fringilla
            est. Egestas fringilla phasellus faucibus scelerisque eleifend donec
            pretium. Ac turpis egestas maecenas pharetra convallis posuere morbi
            leo. Elit at imperdiet dui accumsan sit. Pellentesque habitant morbi
            tristique senectus et. In mollis nunc sed id semper risus in
            hendrerit. Orci dapibus ultrices in iaculis nunc sed augue lacus.
          </Typography>
        </SidePanel.Section>
        <SidePanel.Section>
          <Typography>
            Sodales neque sodales ut etiam sit amet. Tortor dignissim convallis
            aenean et tortor. Sodales ut etiam sit amet. Commodo sed egestas
            egestas fringilla phasellus. Facilisis volutpat est velit egestas.
            Eros donec ac odio tempor orci dapibus ultrices in iaculis. Ultrices
            tincidunt arcu non sodales neque sodales ut etiam. Fusce id velit ut
            tortor pretium viverra suspendisse potenti nullam. Id leo in vitae
            turpis massa sed elementum tempus. Pellentesque massa placerat duis
            ultricies lacus sed turpis. Mollis aliquam ut porttitor leo a. Purus
            semper eget duis at tellus at urna condimentum. Tellus at urna
            condimentum mattis pellentesque id nibh tortor id. Mattis
            ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget.
            Aliquam faucibus purus in massa tempor nec feugiat.
          </Typography>
        </SidePanel.Section>
      </div>
    </SidePanel>
  );
};
