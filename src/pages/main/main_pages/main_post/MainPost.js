import React from 'react'
import './MainPost.css'
import MainNav from './../../Nav'
import useChat from './../../../../useChat'
//maaterial icon
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { AirlineSeatIndividualSuiteSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));


const MainPost = () =>
{   
    const { status, opened, messages, sendPost, clearMessages, hi } = useChat()

    const classes = useStyles();
    const addphoto = ()=>{
        console.log('hi')
    }
    const addpic = ()=>{
        console.log('hi')
    }
    const addvideo = ()=>{
        console.log('nigg')
    }
    const post = ()=>{
        sendPost(
            {
                author:		'nigg',
                location:	'somewhere',
                type:		'post',
                title:		'title',
                text:		document.getElementById('text').value,
                picture:	document.getElementById('showimg').src,
                tags:		'',
                likes:		0,
                comments:	[],
                time:		Date.now
            }
        )
        
    }
   
    return (
        <>
        <div className = 'main-left'>
            <MainNav />
        </div>
            
        <div className = 'main-center'>
            <img id="showimg" src="" />
            <textarea cols="50" rows="5" placeholder = "輸入文字" id = 'text'></textarea>
            <div>
                <IconButton onClick = {addvideo}><VideoCallOutlinedIcon /></IconButton>
                <IconButton onClick = {addphoto}><AddAPhotoIcon /></IconButton>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" name = 'file' />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick = {addpic}>
                    <AddPhotoAlternateIcon />
                    </IconButton>
                </label>
                <Button onClick = {post}>post</Button>
            </div>
                    
        </div>
        
        </>
    );
}

export default MainPost;