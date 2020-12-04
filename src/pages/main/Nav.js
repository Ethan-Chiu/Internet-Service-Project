import React from 'react'
import {Link} from "react-router-dom";

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
//import {  } from '@fortawesome/free-brands-svg-icons'
//import {  } from '@fortawesome/free-brands-svg-icons'

const MainNav = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to = "/main">main</Link>
                </li>
                <li>
                    <Link to = "/main/home">home</Link>
                </li>
                <li>
                    <Link to = "/main/search">search</Link>
                </li>
                <li>
                    <Link to = "/main/post">post</Link>
                </li>
                <li>
                    <Link to = "/main/profile">profile<FontAwesomeIcon icon={faStreetView} size="2x"/></Link>
                </li>
            </ul>
        </nav>
    );

}

export default MainNav;