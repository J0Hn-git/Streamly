import React, { useState } from "react";
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from "../../firebase";

const Login = () => {

    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const user_auth = async (event) => {
        event.preventDefault();
        console.log("Auth started for: ", email);
        setLoading(true);

        try{
            if(signState==="Sign In"){
                console.log("Attempting Login with :", email);
                await login(email, password);
            }else{
                console.log("Attempting singup with: ", name, email);
                await signup(name, email, password);
        }
        console.log("Auth function finished");
        } catch (error) {
            console.log("Auth Eror details: ", error.code, error.message);
            alert(error.message);
            setLoading(false);
        }
        
    }

    return (
        <div className="login">
            <img src={logo} className="login-logo" alt=""/>
            <div className="login-form">
                <h1>{signState}</h1>
                <form>
                    {signState==="Sign Up"?
                    <input value={name} onChange={(e) => {setName(e.target.value)}} 
                    type="text" placeholder="Your name"/>
                    : <></>}

                    <input value={email} onChange={(e) => {setEmail(e.target.value)}}
                    type="email" placeholder="Email"/>

                    <input value={password} onChange={(e) => {setPassword(e.target.value)}}
                    type="password" placeholder="Password"/>

                    <button onClick={user_auth} type="submit" disabled={loading}>
                        {loading ? (
                            <div className="login-spinner"></div>
                        ) : (
                            signState
                        )}
                    </button>

                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox"/>
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <p>Need Help?</p>
                    </div>
                </form>
                <div className="form-switch">
                    {signState==="Sign In"?
                    <p>New to Netflix? <span onClick={() => {setSignState("Sign Up")}}>
                        Sign Up Now
                    </span></p>
                    : <p>Already have account? <span onClick={() => {setSignState("Sign In")}}>
                        Sign In Now
                    </span></p>
                }
                </div>
            </div>
        </div>
    );
};

export default Login;