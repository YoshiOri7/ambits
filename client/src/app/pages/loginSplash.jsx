import React            from 'react';
import { Component }
                        from 'react';
import { browserHistory }
                        from 'react-router';

import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500}  from 'material-ui/styles/colors';

import Login            from '../login/login.jsx';
import * as loginCtrl   from '../login/loginCtrl';
import { getJwt }       from '../login/loginCtrl.js'

// Redux
import { connect }      from 'react-redux';
import { loadAmbits, updateTitle, updateCurDay }
                        from '../_actions/ambit-actions';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const splashStyle = {
  textAlign: 'center',
  marginTop: 100
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});
const noteText = {
  color: '#f44842',
  fontSize: 14,
  paddingLeft: 20,
  paddingRight: 20,
}



class LoginSplash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!!getJwt()) {
      browserHistory.push('/day');
    }
  }

  render() {
    document.body.style.backgroundColor = '#f5eacd';

    const LoginModal = (<Login main={this} />);

    return (
     <MuiThemeProvider muiTheme={muiTheme}>
      <div className="loginTitle" style={splashStyle}>
        <h1 className='title'>Ambitually</h1>
        <span>A Smarty Sprouts Production</span>
        <div style={noteText}>Note: Ambitually is a mobile first application.</div>
        <div style={noteText}>Please adjust your browser to mobile size for better experience.</div>
        {LoginModal}
      </div>
    </MuiThemeProvider>
    );
  }
}

export default LoginSplash;
