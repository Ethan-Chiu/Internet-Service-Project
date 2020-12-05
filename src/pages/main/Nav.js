import React from 'react'
import {Link} from "react-router-dom";
import './Nav.css'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
//import {  } from '@fortawesome/free-brands-svg-icons'
//import {  } from '@fortawesome/free-brands-svg-icons'

//material ui
import { makeStyles, styled } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
      width: '100%',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      padding: '20px 400px',
    },
  });

const MainNav = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
              
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <Link to = "/main"><BottomNavigationAction  icon={<FontAwesomeIcon icon={faStreetView} size="2x"/>} /></Link>
                    <Link to = "/main/search"><BottomNavigationAction  icon={<FontAwesomeIcon icon={faSearch} size="2x"/>} /></Link>
                    <Link to = "/main/post"><BottomNavigationAction icon={<FontAwesomeIcon icon={faPlusSquare} size="2x"/>} /></Link>
                    <Link to = "/main/profile"><BottomNavigationAction icon={<FontAwesomeIcon icon={faAddressCard} size="2x"/>} /></Link>
                </BottomNavigation>
            
            {/* <nav>
                <ul>
                    <li>
                        <Link to = "/main">main<FontAwesomeIcon icon={faStreetView} size="2x"/></Link>
                    </li>
                    <li>
                        <Link to = "/main/search">search<FontAwesomeIcon icon={faSearch} size="2x"/></Link>
                    </li>
                    <li>
                        <Link to = "/main/post">post<FontAwesomeIcon icon={faPlusSquare} size="2x"/></Link>
                    </li>
                    <li>
                        <Link to = "/main/profile">profile<FontAwesomeIcon icon={faAddressCard} size="2x"/></Link>
                    </li>
                </ul>
            </nav> */}
        </>
    );

}

export default MainNav;