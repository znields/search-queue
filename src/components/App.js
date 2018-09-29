import React, { Component } from 'react';
import PopupToolbar from './PopupToolbar';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class App extends Component {

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <PopupToolbar/>
        </MuiThemeProvider>

    );
  }
}

export default App;
