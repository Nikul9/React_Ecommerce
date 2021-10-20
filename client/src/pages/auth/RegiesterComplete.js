import React , { useEffect, useState } from "react";
import { auth } from '../../fireBase'
import { toast ,  ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const RegisterComplete = ({ history }) => {
    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
  useState(() => {
      console.log('NIKUL');
      setEmail(window.localStorage.getItem('Email'))
  },[])
  const handelSubmit = async (e) => {
    e.preventDefault() 
    if(!email || !password ) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
        const result = await auth.signInWithEmailLink(email , window.location.href);
        console.log('RESULT' , result ); 
        if(result.user.email) {
          window.localStorage.removeItem("Email")
          let user = auth.currentUser;
          await user.updatePassword(password);
          const idToken = await user.getIdTokenResult()
          console.log('user' , user , "IDtoken" , idToken );
          history.push('/')
        }
     } catch(e) {
        console.log(e);
        toast.error(e.message);
     }
  }
  return (
    <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              <h4>RegiesterComplet</h4>
              <form>
                <input 
                    type="email" 
                    className="from-control" 
                    value={email}
                    readOnly
                /> <br /><br />
                <input 
                    type="email" 
                    className="from-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    autoFocus
                />
                <br /> <br />
                <button 
                  type="button" onClick={handelSubmit} 
                  className="btn btn-raised" 
                  style={{backgroundColor: "grey"}} >
                    RegiesterComplet   
                </button>
              </form>
          </div>
        </div>
    </div>
  );
};

export default RegisterComplete;