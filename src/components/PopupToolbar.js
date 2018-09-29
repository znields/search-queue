import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QueueIcon from '@material-ui/icons/Queue';
import IconButton from '@material-ui/core/IconButton';


class PopupToolbar extends Component {
  render() {
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <QueueIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Search Queue
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }
}

export default PopupToolbar;
