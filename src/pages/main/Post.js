import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
//apollo
import {
	GET_POST,
	CREATE_POST_MUTATION,
	POSTS_SUBSCRIPTION,
  COMMENT_MUTATION,
  GET_ID,
  LIKE_MUTATION,
  UNLIKE_MUTATION
  } from '../../graphql'
import { useQuery, useMutation } from 'react-apollo'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));



const Post = (props: { title: string, type: string, author: string, text: string, picture: string, tags: Array, time: Function, id: String, comments: Array, video: String, likes: Array }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [user, SetUser] = useState(localStorage.getItem("user"))
  const sendcontrol = useRef()
  const [liked, Setliked] = useState(false);
  const [createComment] = useMutation(COMMENT_MUTATION)
  const { loading, error, data, subscribeToMore } = useQuery(GET_ID, {variables: {id: props.id}})
  const [handleLike] = useMutation(LIKE_MUTATION)
  const [handleUnlike] = useMutation(UNLIKE_MUTATION)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
	var postColor1 = "white"
	var postColor2 = "black"
	switch(props.type) {
		case "red":
			postColor1 = "red"
			postColor2 = "black"
			break;
		case "orange":
			postColor1 = "orange"
			postColor2 = "black"
			break;
		case "yellow":
			postColor1 = "yellow"
			postColor2 = "black"
			break;
		case "green":
			postColor1 = "green"
			postColor2 = "white"
			break;
		case "blue":
			postColor1 = "blue"
			postColor2 = "white"
			break;
		case "purple":
			postColor1 = "purple"
			postColor2 = "white"
			break;
		default:
	}

  useEffect(() => {
    if(props.likes !== undefined)
    {
      props.likes.filter(name=> { 
      if( name === user)
    {
      Setliked(true)
    }} )
  }
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      variables: {id: props.id},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        
        if (subscriptionData.data.postSub.mutation === "COMMENTADDED") {
          const newPost = subscriptionData.data.postSub.data
          return { getPostFromId: {
            _typename: prev.getPostFromId._typename,
            ...prev.getPostFromId,
            comments: [...prev.getPostFromId.comments, newPost]
          }
          }
        }
        else if (subscriptionData.data.postSub.mutation === "LIKED") {
          Setliked(true)
          return{
            getPostFromId:
            {
              ...prev.getPostFromId,
              likes: [...prev.getPostFromId.likes, user]
            }
          }
        }
        else if (subscriptionData.data.postSub.mutation === "UNLIKED") 
        {
          Setliked(false)
          return {
            getPostFromId:
            {
              ...prev.getPostFromId,
              likes: prev.getPostFromId.likes.filter((names)=>{
                if(names !== user)
                {
                  return names
                }
              })
            }
          }
        }
      } 
    })
  }, [subscribeToMore])

  
  const sendComment = () => {
    createComment({
        variables: {
          id: props.id,
          user: user,
          text: document.getElementById(props.id).value,
        }
    })
    document.getElementById(props.id).value = ''
  }
  return (
    <Card className={classes.root} >
      <CardHeader
      style={{background: postColor1, color: postColor2}}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.author[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.time}
      />
        {props.picture? (<CardMedia
        className={classes.media}
        image = {props.picture}
        controls
        title="Paella dish"></CardMedia>): 
        (<ReactPlayer url={props.video} playing = {true} controls style = {{margin: "0px auto"}}></ReactPlayer>)}
        
      <CardContent>
        <Typography variant="body1" color={postColor2} component="p">
          {props.text}
        </Typography>
        <Typography variant="body2" color={postColor2} component="p">
          tags: {props.tags.map((tags, i) => (
          <>
            <span style={{ color: 'blue', textDecoration: 'underline' }}>{tags}</span>
            <span> </span>
          </>))}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" >
          <FavoriteIcon color = {liked? ("secondary"):("default")} onClick = {()=>{
            Setliked(!liked)
            if(liked)
            {
              handleUnlike({variables : {
                id: props.id, 
                user: user}})
            }
            else if(liked === false)
            {
              handleLike({variables : {
              id: props.id, 
              user: user}})
            }
              }}/>
        </IconButton>
        <p>{data? data.getPostFromId.likes.length: 0}</p>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <AddIcon />
        </IconButton>
      </CardActions>

      <Collapse style = {{maxHeight: "300px", overflowY: "scroll"}} in={expanded} timeout="auto" unmountOnExit>
        <div style = {{paddingLeft: "10px"}}>Comments: </div>
        <div>
          <Card>
            <CardHeader avatar = 
            {<Avatar aria-label="recipe" className={classes.avatar}>{user[0]}</Avatar>}
            title = {
              <>
            <TextField style = {{borderRadius: "10", float: "left"}} placeholder="Addcomment" multiline rows={1} rowsMax={2} id={props.id} ref={sendcontrol} />
            <Button onClick={() => { sendComment() }} id={props.id}>Send</Button>
            </>}>
            </CardHeader>
          </Card>
          {data? (data.getPostFromId.comments.map(({user, text}, i)=>(
            <Card>
            <CardHeader avatar = 
            {<Avatar aria-label="recipe" className={classes.avatar}>{user[0]}</Avatar>}
            title = {text}>
            </CardHeader>
          </Card>

          ))): (<div></div>)}
        </div>
        
      </Collapse>

    </Card>
  )
}

export default Post;
