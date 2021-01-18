import React, {useState} from 'react'
import './MainProfile.css'
import MainNav from './../../Nav'
//material ui
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const MainProfile = () =>
{
    const [name, SetName] = useState('')
    const [age, SetAge] = useState('')
    const [address, SetAddress] = useState('')
    const changecover = (e) =>{
        e.preventDefault();
        console.log("hi")
        console.log(e.target.value)
    }
    return (
        <>
        <div className = "main-div">
            <div className = "profile_img">
                <img className = "profile_pic" src ="https://memes.tw/user-template/bee4c8f3cd6c4426c86a343e6b9a4ad3.png"></img>
                <input accept="image/*" className='input' id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" className = "change_photo">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                
                <input accept="image/*" className='input' id="icon-button-file" type="file" onChange = {changecover}/>
                    <label htmlFor="icon-button-file" className = "change_cover" >
                        <IconButton color="primary" aria-label="upload picture" component="span" >
                            <PhotoCamera />
                        </IconButton>
                        <h >add cover</h>
                    </label>
                   
            
                
            </div>
            <div style ={{float: "left", width: "100%"}}>
                <p style ={{float: "left", width: '120px', fontSize: "15px"}}>name:</p>
                
                {name ?
                (<>
                <p style ={{float: "left", width: "200px", fontSize: "15px"}}>{name}</p>
                <Button onClick = {()=>{SetName('')}}>reset Name</Button>
                </>)
                :(<>
                <input id = 'name' className = 'name' style ={{float: "left", width: "200px"}}></input>
                <label htmlFor = 'name'>
                    <Button onClick = {(e)=>{
                        SetName(document.getElementById("name").value)}}>enter</Button>
                </label>
                </>) 
                }
            </div>
    
            <div style ={{float: "left", width: "100%"}}>
                <p style ={{float: "left", width: '120px', fontSize: "15px"}}>age:</p>
                {age ?
                (<>
                <p style ={{float: "left", width: "200px", fontSize: "15px"}}>{age}</p>
                <Button onClick = {()=>{SetAge('')}}>reset age</Button>
                </>)
                :(<>
                <input id = 'age'  style ={{float: "left", width: "200px"}}></input>
                <Button onClick = {(e)=>{
                        SetAge(document.getElementById("age").value)
                }}>enter</Button>
                </>) 
                }
            </div>

            <div style ={{float: "left", width: "100%"}}>
                <p style ={{float: "left", width: '120px', fontSize: "15px"}}>address:</p>
                {address ?
                (<>
                <p style ={{float: "left", width: "200px", fontSize: "15px"}}>{address}</p>
                <Button onClick = {()=>{SetAddress('')}}>reset address</Button>
                </>)
                :(<>
                <input id = 'address'  style ={{float: "left", width: "200px"}}></input>
                <Button onClick = {(e)=>{
                        SetAddress(document.getElementById("address").value)
                }}>enter</Button>
                </>) 
                }
            </div>
         
        </div>
        
        <MainNav className = "nav"/>
        </>
    );
}

export default MainProfile;