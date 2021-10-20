import Password from "antd/lib/input/Password";
import { auth, googleAuthProvider } from "../../fireBase";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import React, { useState , useEffect } from "react";
import { useStore } from "react-redux";
import { useDispatch , useSelector } from "react-redux"
import { userReduser } from "../../Redusers/userRedusers";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Button } from "antd";
import { Link } from "react-router-dom"
import axios from "axios"

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const Login = () => {
  const {user} = useSelector((state) => {
    return{...state}
  })
    useEffect(() => {  
    console.log("in use Effect");
    if(user)  {
        console.log('in if');
        history.push('/')
    }
  },[user])
  const [ password , setPassword ] = useState('NIKUL0000')
  const [ email , setEmail ] = useState('9328217188nikul@gmail.com')
  const [ loading , setLoading ] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const handelSubmit = async(e) => {
    e.preventDefault()
    try {
      const result =  await auth.signInWithEmailAndPassword(email , password)
      console.log(result);
      const { user } = result
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
        .then((res) => {
            console.log("success response => => " ,res);
        }).catch((e) => {
            console.log(e);
        })
        dispatch({
          type    : "LOGGED_IN_USER",
          payload : {
            email   : user.email ,
            idToken : idTokenResult.token  
          }
      })
      history.push('/')
    } catch (e) {
        console.log(e);
        toast.error(e.message)
        setLoading(false)
    }
  }
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
          <div className="col-md-6 offset-md-3">
              <h4>Login</h4>
              <form>
                <input 
                    type="email" 
                    className="from-control" 
                    value={email}
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)} 
                    autoFocus
                /><br /> <br></br>
                <input 
                    type="email" 
                    className="from-control" 
                    value={password}
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}     
                /><br /> <br />
                <Button 
                type="danger"
                className="mb-3"
                shape="round"
                onClick={handelSubmit} 
                >
                  Login  
                </Button>
                <br />
                <Button
                  onClick={googleLogin}
                  type="danger"
                  className="mb-3"
                  shape="round"
                  icon={<GoogleOutlined />}
                  size="large"

                >
                  Login with Google
                </Button>
                  <br /><Link to="/forgot/password">Forgot Password</Link>
              </form>
          </div> 
  );
};

export default Login;
