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


const Post = (props: { title: string, author: string, text: string, picture: string, tags: Array, time: Function, id: number, comments: Array }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const sendcontrol = useRef()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendComment = () => {
    console.log(document.getElementById(props.id).value)
    document.getElementById(props.id).value = ''
  }
  return (
    <Card className={classes.root}>
      <CardHeader
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
      <CardMedia
        className={classes.media}
        image={props.picture}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {props.text}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          tags: {props.tags.map((tags, i) => (
          <>
            <span style={{ color: 'blue', textDecoration: 'underline' }}>{tags}</span>
            <span> </span>
          </>))}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {props.comme}
        <div style = {{padding: "10px", height: "50px"}}>Comments: </div>
        <TextField placeholder="Addcomment" multiline rows={1} rowsMax={2} id={props.id} ref={sendcontrol} />
        <Button onClick={() => { sendComment() }} id={props.id}>Send</Button>
      </Collapse>

    </Card>
  )
}

export default Post;