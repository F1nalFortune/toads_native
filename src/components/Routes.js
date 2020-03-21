import React, { Component } from 'react';
import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword'

export default class Routes extends Component{
  render(){
    return(
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" />
          <Scene key="signup" component={SignUp} title="Register" initial={true} />
          <Scene key="forgot" component={ForgotPassword} title="Forgot" />
        </Stack>
      </Router>
    )
  }
}
