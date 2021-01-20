import React from 'react'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom";
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
	LOGIN_QUERY,
	SIGNUP_MUTATION
} from '../../graphql'

const Login  = () => {
    // const [signedin, setSignedin] = useState(false);
    // const [userpassword, setPass] = useState('')
    // const [user, setUser] = useState("aa");
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [raccount, setRAccount] = useState("")
    const [rpassword, setRPassword] = useState("")

    const [result, setResult] = useState("")

    const [signup_mutation] = useMutation(SIGNUP_MUTATION)
		
//localstorage
//name
//theme
//signin

//use to route
    let history = useHistory();

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

    function LOGIN() {
        const { logincalled, loginloading, logindata } = useQuery(
            LOGIN_QUERY, {
                variables: {
                    account:	account,
                    password:	password
            }
        })
        if (result !== logindata) {
            setResult(logindata)
        }
        return
    }
    LOGIN()

    const signin = async() => {
        console.log(result)

        // localStorage.setItem('signin', true)
        localStorage.setItem('user', name)
    }
    
    const signup = async() => {
        if (!name || !email || !account || !password) return

        await signup_mutation({
            variables: {
                name:		name,
                email:		email,
                account:	account,
                password:	password
            }
        })

        console.log("sign up")
        localStorage.setItem('user', name)
        setName("")
        setEmail("")
        setRAccount("")
        setRPassword("")
        history.push("/main");
    }

    return(
        <div className="theme-dark" id="theme-controller">
            <div className="top">
                <button id="themeswitch" onClick={toggleTheme}><FontAwesomeIcon icon={faAdjust}/></button>
            </div>
            <div class="container" id="container">
                <div class="form-container sign-up-container">
                    <form action="#/main">
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
                        <input type="account" placeholder="Account" required 
													onChange={(e) => setAccount(e.target.value)}/>
                        <input type="password" placeholder="Password" required 
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

