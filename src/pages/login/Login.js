import React from 'react'
import { useState, useEffect } from 'react'
import GoogleBtn from './GoogleBtn';
import InAppAccBtn from './InAppAccBtn'
import './Login.css'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import {faAdjust} from '@fortawesome/free-solid-svg-icons'

import io from "socket.io-client"

const Login  = () => {
    const [username, SetName] = useState('')
    const [useremail, SetEmail] = useState('')
    const [userpassword, SetPass] = useState('')

    // const [signedin, setSignedin] = useState(false);
    const handlesign = () =>{
        if( username && useremail && userpassword)
        {
            
        }
    }

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
            // let socket = io('localhost:4000');
            // console.log(socket);
        }
    );

    function signin() {
        console.log("sign in");
        localStorage.setItem('signin', true)
        //localStorage.setItem('user', user)
    }

    return(
        <div class = "theme-dark" id = "theme-controller">
            <div class = "top">
                <button id = "themeswitch" onClick = {toggleTheme}><FontAwesomeIcon icon={faAdjust}/></button>
            </div>
            <div class="container" id="container">
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" onChange = {(e)=>{SetName(e.target.value)}}/>
                        <input type="email" placeholder="Account" onChange = {(e)=>{SetEmail(e.target.value)}}/>
                        <input type="password" placeholder="Password" onChange = {(e)=>{SetPass(e.target.value)}}/>
                        <button onClick = {handlesign}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div class="social-container">
                            <GoogleBtn/>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Account" />
                        <input type="password" placeholder="Password" />
                        <a href="#/Main" >Forgot your password?</a>
                        <button onClick= {signin}>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Already have an account?</p>
                            <button class="ghost" id="signIn" onClick = {undomovePanel}>Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button class="ghost" id="signUp" onClick = {movePanel}>Sign Up</button>
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

