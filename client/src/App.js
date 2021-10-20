import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import { toast ,  ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import RegisterComplete from "../src/pages/auth/RegiesterComplete"
import { Provider } from 'react-redux'
import { auth } from "./fireBase"
import { useDispatch } from "react-redux"
import ForgotPassword from './pages/auth/ForgotPassword'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('USER' , user);  
      if(user) {
          const idToken = await user.getIdTokenResult()
          dispatch({
            type : "LOGGED_IN_USER",
            payload : {
              email : user.email,
              token : idToken.token
            }
          })
        }
    })
  },[])
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/"                  component={Home} />
        <Route exact path="/login"             component={Login} />
        <Route exact path="/register"          component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password"   component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;
