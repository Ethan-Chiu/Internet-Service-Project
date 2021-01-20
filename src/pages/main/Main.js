import React, { useEffect, useRef, useState, useMemo } from "react";
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
  COMMENT_MUTATION,
  GET_ID
  } from '../../graphql'
import { useQuery, useMutation } from 'react-apollo'
//map
import GoogleMapReact from 'google-map-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"



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
  const [posts, Setposts] = useState([])
  const { loading, error, data, subscribeToMore} = useQuery(GET_POST, {variables: {x: currentlat, y: currentlng, s: 2000}})
  const cachedMutatedData = useMemo(() => {
    if (loading || error) return null
    Setposts(data.getPosts)
    return data
  }, [loading, error, data])

  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        console.log(subscriptionData.data.postSub)
        if (subscriptionData.data.postSub.mutation === "COMMENTADDED") {
          const newPost = subscriptionData.data.postSub.data
          console.log(newPost)
          return {
            ...prev,
            names: [...prev.names, newPost]
          }
        }
        else {

          console.log(subscriptionData.data.subscribeName)
          return {
            ...prev,
            names: []
          }
        }
      }
    })
  }, [subscribeToMore])

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

  function Map(){
    return (
      <GoogleMap
        zoom = {15}
        center = {{lat: currentlat, lng: currentlng}}
      >
        
          {posts !== undefined? posts.map(({location}, i)=>(<Marker 
          position = {{
            lat: location.x,
            lng: location.y
          }}></Marker>)):(<Marker position = {{
            lat: currentlat,
            lng: currentlng}}></Marker>)}
        
      </GoogleMap>
    )
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map))

	return (
		<>
     <div id = 'theme-controller'>
		<div className = 'main'>
			<div className = 'main-left'>
				<MainNav/>
			</div>
      <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBES8rvsfwrOtLZ5S4EvedrOJ4OSIR49UY&callback=initMap">
      </script>
			<div className = 'main-center'>
        <div style={{ height: '100vh', width: '100%' }} id = "map">
          <WrappedMap 
          googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBES8rvsfwrOtLZ5S4EvedrOJ4OSIR49UY"}
          loadingElement = {<div style = {{height: '100%'}}/>}
          containerElement = {<div style = {{height: '100%'}}/>}
          mapElement = {<div style = {{height: '100%'}}/>}
          />
        </div>
      </div>
			<div className = 'main-right'>
	
          <div>
            <Slide easing = "ease">
            {posts !== undefined? (posts.map(({author, title, picture, text, time, tags, id, comments, video}, i)=>
            (<div className="each-slide" key = {i}>
              <Post title={title} author={author[0]} picture={picture} text={text} time={time} id={id} tags={tags} comments = {comments} video = {video}/>
              </div>)
            )): (<div></div>)}
            </Slide>
          </div>
          

        </div>
    </div>
    </div>
    </>
  )
}

export default Main;
