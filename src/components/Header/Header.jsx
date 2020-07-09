import React from 'react';

import { MenuBar, Typography, ToolBar } from '@mott-macdonald/smi-react-ui-kit';

import { ReactComponent as Logo } from './mm-si-logo.svg';

import './Header.scss';

export const Header = () => (
  <MenuBar className="header">
    <MenuBar.ItemGroup className="logo-container">
      <ToolBar className="logo-group" gutter="large">
        <a
          href="https://www.smartinfrastructure.com"
          target="_blank"
          rel="noopener nofollow noreferrer"
          title="Mott MacDonald - Smart Infrastructure"
        >
          <Logo />
        </a>
      </ToolBar>
    </MenuBar.ItemGroup>
    <MenuBar.ItemGroup align="right">
      <Typography secondary>SMI React Starter Kit</Typography>
    </MenuBar.ItemGroup>
  </MenuBar>
);
