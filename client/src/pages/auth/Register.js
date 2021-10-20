import React , { useState , useEffect } from "react";
import { auth } from '../../fireBase'
import { toast ,  ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch , useSelector } from "react-redux"
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory()
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
  const [ email , setEmail ] = useState("");
  const handelSubmit = async (e) => {
      e.preventDefault()
      const config = {
        url : process.env.REACT_APP_REGIESTER_REDIRECT_URL,
        handleCodeInApp: true,
      }
      await auth.sendSignInLinkToEmail(email , config).then(() => {
        toast.success(`Email is Send to ${email} Click Link to complete Regieteration`)
      }).catch((e) => {
        alert(e)
      })
      setEmail('')
      window.localStorage.setItem("Email",email)
  }
  return (
    <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              <h4>Register</h4>
              <form>
                <input 
                    type="email" 
                    className="from-control" 
                    value={email}
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)} 
                    autoFocus
                /><br /> <br></br>
                <button type="button" onClick={handelSubmit} className="btn btn-raised" style={{backgroundColor: "grey"}} >
                  Regiester   
                </button>
              </form>
          </div>
        </div>
    </div>
  );
};

export default Register;
