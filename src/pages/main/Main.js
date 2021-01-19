import React, { useEffect, useRef, useState } from 'react'
//import { Button, Input, message, Tag } from 'antd'
import GridList from '@material-ui/core/Gridlist'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import urls from '../../images';
import Box from '@material-ui/core/Box';
import './Main.css'
import { Button, Input, message, Tag } from 'antd'
import useChat from '../../useChat'
import {
	GET_POST,
	CREATE_POST_MUTATION,
	POSTS_SUBSCRIPTION,
	DELETE_POST_MUTATION
  } from '../../graphql'
import { useQuery, useMutation } from 'react-apollo'
//map
import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';



//SPA Navigation 
import MainNav from './Nav'
import Post from './Post'
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Avatar from '@material-ui/core/Avatar';
//bootstrap
import "react-slideshow-image/dist/styles.css"
import { Slide } from 'react-slideshow-image';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const sample = {
  author: 'nigg',
  location: 'somewhere',
  type: 'post',
  title: 'title',
  text: 'I am poop 2ㄏ2ㄏ',
  picture: 'https://truth.bahamut.com.tw/s01/201904/2020e6be121356d975aa1a51df35411c.JPG',
  tags: ['#2ㄏ2ㄏ', '乳滑', 'shitpost'],
  likes: 0,
  comments: [],
  time: Date.now
}


const Main = ()=>{
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const classes = useStyles();
  //const [user, Setuser] = useStyles(localStorage.getItem('user'));
	const [open0, setOpen0] = React.useState(true);
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [currentlat, SetLat] = useState(25.01);
  const [currentlng, SetLng] = useState(121.53);
  const [posts, Setposts] = useState('')
  let dataarr = [];
  async function GETPOST(){
    console.log(currentlng, currentlat)
    const {loading, error, data} = useQuery(GET_POST, { variables: { x: Math.floor(currentlat), y:  Math.floor(currentlng), s: 2000},})
    if(loading) return "loading"
    if(error) return "no"
    if(posts ===true || data == undefined) return "ass"
    else{
      dataarr = data.getPosts
    }
  }
 GETPOST()
 setInterval(function(){
   navigator.geolocation.getCurrentPosition((pos)=>{
   SetLat(pos.coords.latitude)
   SetLng(pos.coords.longitude)
   
 })}, 3000);
  const handleClick0 = () => {
    setOpen0(!open0);
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)

  };
  const handleClick1 = () => {
      setOpen1(!open1);
      setOpen0(false)
      setOpen2(false)
      setOpen3(false)
	};
	const handleClick2 = () => {
      setOpen2(!open2);
      setOpen0(false)
      setOpen1(false)
      setOpen3(false)
	};
	const handleClick3 = () => {
      setOpen3(!open3);
      setOpen0(false)
      setOpen2(false)
      setOpen1(false)
  	};
	return (
		<>
    
		<div className = 'main'>
			<div className = 'main-left'>
				<MainNav/>
			</div>
      <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBES8rvsfwrOtLZ5S4EvedrOJ4OSIR49UY&callback=initMap">
      </script>
			<div className = 'main-center'>
        <div style={{ height: '100vh', width: '100%' }} id = "map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBES8rvsfwrOtLZ5S4EvedrOJ4OSIR49UY" }}
            defaultCenter={ {
              lat:  currentlat,
              lng: currentlng
            }}
            defaultZoom={20}
          ><AnyReactComponent
              lat={currentlat}
              lng={currentlng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
			<div className = 'main-right'>
	
          <div>
            <Slide easing = "ease">
            {dataarr? (dataarr.map(({author, title, picture, text, time, tags}, i)=>
            (<div className="each-slide" key = {i}>
              <Post title={title} author={author[0]} picture={picture} text={title} time={time} id={i} tags={tags} />
              </div>)
            )): (<div></div>)}
            </Slide>
          </div>
          

        </div>
    </div>
      
    </>
  )
}

export default Main