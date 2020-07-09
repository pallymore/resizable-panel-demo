import React from 'react';
import {
  CheckBoxChecked,
  Typography,
  Button,
  ToolBar,
} from '@mott-macdonald/smi-react-ui-kit';

import './Welcome.scss';

const Welcome = () => (
  <div className="welcome">
    <Typography display="flex" variant="h1" gutterBottom>
      <span className="check-icon">
        <CheckBoxChecked />
      </span>
      All Systems Go!
    </Typography>
    <Typography gutterBottom>You are ready to develop!</Typography>
    <ToolBar orientation="vertical" className="external-links" gutter="large">
      <Button
        href="https://github.com/H2knOw-how/smi-react-ui-kit"
        target="_blank"
        rel="nofollow noopener"
      >
        SMI React UI Kit
      </Button>
      <Button
        href="https://gist.github.com/pallymore/10b0de1d69352aa064f483a0966b7b27"
        target="_blank"
        rel="nofollow noopener"
        variant="secondary"
      >
        React Coding Standards
      </Button>
      <Button
        variant="link"
        href="https://facebook.github.io/create-react-app/docs/setting-up-your-editor"
        target="_blank"
      >
        Create React App Docs
      </Button>
    </ToolBar>
  </div>
);

export default Welcome;
