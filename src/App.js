import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import PostComment from './Components/PostComments/PostComment';
import SignUp from './Components/Auth/SignUp';
import { AuthProvider } from './Components/Auth/AuthContext';
import Login from './Components/Auth/Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './Components/Auth/forgotPassword';
import UpdateProfile from './Components/Auth/updateProfile';

const App = () => {
  return (
    <div style={{padding: "10px"}} id="background">
        
        <div style={{margin:"20px auto"}}>
        
        <BrowserRouter>
        <AuthProvider>
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <PrivateRoute exact path="/POST" component={PostComment}/>   
        <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>   
        <Route path="/SignUp" component={SignUp}/>
        <Route path="/ForgotPassword" component={ForgotPassword}/>
        <Route path="/LogIn" component={Login}/>
        <Redirect to="/" />
        </Switch>
        </AuthProvider>
          </BrowserRouter>
        
          </div> 
</div>
  );
}

export default App;