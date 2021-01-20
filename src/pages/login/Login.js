import React from 'react'
import { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from "react-apollo"
import { useHistory, useLocation } from "react-router-dom";
import GoogleBtn from './GoogleBtn';
// import InAppAccBtn from './InAppAccBtn'
import './Login.css'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import {faAdjust} from '@fortawesome/free-solid-svg-icons'

import {
    LOGIN_QUERY ,
	SIGNUP_MUTATION
} from '../../graphql'

const Login  = () => {
    // const [signedin, setSignedin] = useState(false);

    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [raccount, setRAccount] = useState("")
    const [rpassword, setRPassword] = useState("")

    const [signup_mutation] = useMutation(SIGNUP_MUTATION)
    const [getData, { loading, data }] = useLazyQuery(LOGIN_QUERY);
        
    useEffect(()=>{
        if(localStorage.getItem("account")!=null){
            setAccount(localStorage.getItem("account"));
        }
    },[])
    
//localstorage
//account
//name
//theme

//use to route
    let history = useHistory();
    // let location = useLocation();

    const movePanel = ()=>
    {
        document.getElementById('container').classList.add("right-panel-active");
    }

    const undomovePanel = ()=>
    {
        document.getElementById('container').classList.remove("right-panel-active");
    }

    // function to set a given theme/color-scheme
    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.getElementById("theme-controller").className = themeName;
    }
    // function to toggle between light and dark theme
    function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark'){
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
    }

    useEffect(
        // Immediately invoked function to set the theme on initial load
        () => {
            if (localStorage.getItem('theme') === 'theme-dark') {
                setTheme('theme-dark');
            } else {
                setTheme('theme-light');
            }
        }
    );

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// to sign in --
    useEffect(()=>{
        getData({
            variables: {
                account:	account,
                password:	password
            }
        })
    },[account, password])
    const signin = async() => {
		if (!account || !password) return;
        if(data.login === "wrong password")
        {
            alert("wrong password");
            setPassword("");
        }
        else if(data.login === "account not found")
        {
            alert("account not found. If you don't have an account, click the sign up button now!");
            setAccount("");
            setPassword("");
        }
        else if(data.login === "login success")
        {
            localStorage.setItem("account",account);
            history.replace("/main");
        }
        else
            return ;
        // history.replace("/main")
    }
// -- to sign in
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// to sign up --
    const signup = async() => {
		if (!name || !email || !raccount || !rpassword) return;
        const res = await signup_mutation({
            variables: {
                name:		name,
                email:		email,
                account:	raccount,
                password:	rpassword
            }
        })
        if (res.data.signup === "success") {
            localStorage.setItem('user', name)
            setName("")
            setEmail("")
            setRAccount("")
            setRPassword("")
            history.replace("/main")
        } else if (res.data.signup === "account already exist") {
            alert("account already exist")
            setRAccount("")
            return
        }
        else
            return ;
    }
// -- to sign up
//////////////////////////////////////////////////////////////////////////////////////////////////////////


    return(
        <div className="theme-dark" id="theme-controller">
            <div className="top">
                <button id="themeswitch" onClick={toggleTheme}><FontAwesomeIcon icon={faAdjust}/></button>
            </div>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
					<form>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" value={name} required 
													onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email" value={email} required 
													onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" placeholder="Account" value={raccount} required 
                                                    onChange={(e) => setRAccount(e.target.value)}/>
                        <input type="password" placeholder="Password" value={rpassword} required 
													onChange={(e) => setRPassword(e.target.value)}/>
                        <button type="submit" onClick={signup} id="signupBtn">Sign Up</button>
					</form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <GoogleBtn/>
                        </div>
                        <span>or use your account</span>
                        <input type="account" placeholder="Account" value={account} required 
													onChange={(e) => setAccount(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} required 
													onChange={(e) => setPassword(e.target.value)}/>
                        <a href="#/Main" >Forgot your password?</a>
                        <button type="submit" onClick={signin} id="signinBtn">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Already have an account?</p>
                            <button className="ghost" id="signIn" onClick = {undomovePanel}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick = {movePanel}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>
                    Created with  by
                    <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
                    - Read how I created this and how you can join the challenge
                    <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
                </p>
            </footer>
        </div>
        
    )
}

export default Login;

