import { auth } from "../../fireBase";
import React, { useState , useEffect} from "react";
import { userReduser } from "../../Redusers/userRedusers";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useSelector , useDispatch } from "react-redux";

const  ForgotPassword = () => {
    
    const history = useHistory()     
    const [email , setEmail ] = useState('')
    var loadingValue = false 
    const [loading , setLoading] = useState(loadingValue)
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
    const handelSubmit = async (e) => {
        e.preventDefault()
        console.log("IN_HENDEL_SUBMIT");
        loadingValue = true
        const config = {
            url : process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
          }
        await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('');
            setLoading(false)
            toast.success('cheak your email for password reset Link')
        }).catch((error) => {
            setLoading(false)
            toast.error(error)
        })
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {!loading ? (<h4>Forgot Password</h4>) : (<h4>Loading</h4>) }
            <form >
                <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="TYPE YOUR EMAIL"
                />
                <br />
                <button
                    type="submit"
                    onClick={handelSubmit}
                    className="btn btn-raised" 
                    // disabled={!email} 
                    style={{backgroundColor: "grey" , color:"black"}}  > 
                    SUBMIT
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword