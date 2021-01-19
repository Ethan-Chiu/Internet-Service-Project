import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './MainPost.css'
import MainNav from './../../Nav'
import { CREATE_POST_MUTATION } from './../../../../graphql'
import { useMutation } from '@apollo/react-hooks'
//material icon
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import { AirlineSeatIndividualSuiteSharp } from '@material-ui/icons';
//antd
import { Input } from 'antd'
const { TextArea } = Input;

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

//utility
// function insertAfter(newNode, existingNode) {
//     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
// }

const MainPost = () =>
{  
    const classes = useStyles();

    const inputRef = useRef(null)

    const [user, setUser] = useState(localStorage.getItem('user')); 
    const [location, setLocation] = useState({ x: 23, y: 4, s:20});
    const [title, setTitle] = useState("");
    const [type, setType] = useState("blue");
    const [text, setText] = useState("");
    const [picture, setPicture] = useState("");
    const [video, setVideo] = useState("");
	const [tags, setTags] = useState([]);

    const [createPost] = useMutation(CREATE_POST_MUTATION)

    useEffect(() => {
        console.log(user)
    }, []);


//////////////////////////////////////////////////////////////////////////////
//show media--
    const constraints = {
        audio: true,
        video:{
            width: 360,
            height: 360
        }
    }

    async function init(){
        try{
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            handleCapture(stream);
        }
        catch(e){
            console.log(`navigator.mediaDevices.getUserMedia: ${e.toString()}`)
        }
    }

    function handleCapture(stream){
        window.stream = stream;
        const videoHolder = document.getElementById("video-holder");
        videoHolder.innerHTML="";
        const rawVideo = document.createElement("video");
        rawVideo.setAttribute('id', "raw-video");
        rawVideo.setAttribute('playsInline', null);
        rawVideo.setAttribute('autoPlay', null);
        rawVideo.srcObject = stream;
        videoHolder.appendChild(rawVideo);
    }
//--show media
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//cancel show media--
    function confirm(){
        const videoHolder = document.getElementById("video-holder");
        videoHolder.innerHTML="";
        const b1 = document.getElementById("captureButton");
        const b2 = document.getElementById("recordButton");
        b1.innerHTML = "";b2.innerHTML = "";
    }
//--cancel show media
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//remove Media--
function removeMedia(){
    setPicture("");
    setVideo("");
    const mediaResult = document.getElementById("mediaResult")
    mediaResult.innerHTML = "";
}
//--remove Media
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//record--
    let mediaRecorder;
    let recordedBlobs;

    function startRecording() {
        recordedBlobs = [];
        let options = {mimeType: 'video/webm;codecs=vp9,opus'};
        try {
        mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        return;
        }
    
        const recordButton = document.getElementById("recordButton");
        recordButton.innerHTML = "Stop Recording"
        // mediaRecorder.onstop = (event) => {
        //     console.log('Recorder stopped: ', event);
        //     console.log('Recorded Blobs: ', recordedBlobs);
        // };
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
        console.log('MediaRecorder started', mediaRecorder);
    }

    function handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);

            const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
            var reader = new FileReader();
            reader.readAsDataURL(superBuffer);
            reader.onload = function() {
                var base64data = reader.result;                
                setVideo(base64data);
            }
        }
    }

    function stopRecording() {
        mediaRecorder.stop();
    }
//--record
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//play recorded--
    function playRecorded() {

        // reset screen
        const mediaResult = document.getElementById("mediaResult")
        mediaResult.innerHTML = "";
        var recordedVideo = document.createElement("video");
        recordedVideo.setAttribute('id', "videoPrev");
        recordedVideo.setAttribute('width', "360");
        recordedVideo.setAttribute('height', "360");
        mediaResult.appendChild(recordedVideo);
        // reset screen done

        const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
        console.log(recordedBlobs)
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.controls = true;
        recordedVideo.play();
    };
//--play recorded
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//download--
    function download(){
        const blob = new Blob(recordedBlobs, {type: 'video/mp4'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.mp4';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
    }
//--download
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//set tags--
    useEffect(()=>{
        var [doncare, ...pretags] = text.replace(/\n/g, " ").split('#');
        var temptags = [];
        pretags.map(e=>{
            temptags.push(e.split(' ')[0]);
        })
        setTags(temptags)
    },[text])
//--set tags
//////////////////////////////////////////////////////////////////////////////


//graphql
    function post(){
        if (!user || !location || !title || !type) return

        createPost({
            variables: {
                author: user,
                x: location.x,
                y: location.y,
                s: location.s,
                title: title,
                type: type,
                text: text,
                picture: picture,
                video: video,
                tags: tags
            }
        })
        setTitle('')
        setText('')
    }

//button function
    const addphoto = ()=>{
        init();

        // reset display
        const mediaResult = document.getElementById("mediaResult")
        mediaResult.innerHTML = "";
        // reset done (append canvas)

        const playButton = document.getElementById("playButton");
        const recordButton = document.getElementById("recordButton");
        const captureButton = document.getElementById("captureButton");
        
        playButton.innerHTML = ""
        recordButton.innerHTML = ""
        captureButton.innerHTML = "Captuer Image"
        

        captureButton.addEventListener("click",function(){
            // reset display
            const mediaResult = document.getElementById("mediaResult")
            mediaResult.innerHTML = "";
            var newCanvas = document.createElement("canvas");
            newCanvas.setAttribute('id', "canvas");
            newCanvas.setAttribute('width', "360");
            newCanvas.setAttribute('height', "360");
            mediaResult.appendChild(newCanvas);
            // reset done (append canvas)
            var context = newCanvas.getContext('2d');

            const rawVideo = document.getElementById("raw-video");
            context.drawImage(rawVideo, 0, 0, 360, 360);
            setPicture(newCanvas.toDataURL("image/png"));
            // console.log(picture);
        })
    }

    const addpic = ()=>{
        console.log('hi')
    }

    const addvideo = ()=>{
        console.log("add video")
        init(); 

        // reset display
        const mediaResult = document.getElementById("mediaResult")
        mediaResult.innerHTML = "";
        // reset done (append video)

        const recordButton = document.getElementById("recordButton");
        const captureButton = document.getElementById("captureButton");
        recordButton.innerHTML = "Start Recording"
        captureButton.innerHTML = ""
        recordButton.addEventListener("click",()=>{
            if(recordButton.textContent === "Start Recording"){
                startRecording();
            }
            else{
                stopRecording();
                //set screen
                recordButton.textContent = "Start Recording"
                const playButton = document.getElementById("playButton");
                playButton.innerHTML = "Play Recorded Video"
                //set screen done
            }
        })
    }

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
    return (
        <>
        <div id = "theme-controller">
        <MainNav className = "nav"/>
        <div className = "main-div">
            <div className = 'main-left'>
                
            </div>
                
            <div className = 'main-center' id="main">
                <img id="showimg" src="" />
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginBottom: 10 }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            inputRef.current.focus()
                        }
                    }}
                ></Input>
                <TextArea
                    rows={4}
                    placeholder="Type your text here..."
                    value={text}
                    ref={inputRef}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                ></TextArea>
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

                
                <button id="playButton" onClick={playRecorded}></button>
                
                <button id="removePicture" onClick = {removeMedia}> Remove Picture Or Video</button>

                <div id="mediaResult">
                    
                </div>
                <button id="cancelButton" onClick = {confirm}> Confirm(close camera view) </button>
                <button id="downloadButton" onClick = {download}>Download</button>
            </div>

            <div className = 'main-right' id="main">
                    Camera View
                    <div className = "video-holder" id = "video-holder">
                    </div>

                    <button id="captureButton"></button>
                    <button id="recordButton"></button>
            </div>

        </div>
        </div>
        </>
    );
}

export default MainPost;