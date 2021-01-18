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
//map


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
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
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

const Main = () => {
  const classes = useStyles();
  const [open0, setOpen0] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
      <div className='main'>
        <div className='main-left'>
          <MainNav />
        </div>
        <div className='main-center'>

        </div>
        <div className='main-right'>

          {/*<GridList cellHeight={90} cols={1} >
				{urls.map((title, index) => (
				<GridListTile key={index} >
					<img src={title} />
					<GridListTileBar title = 'hi'/>
				</GridListTile>
					))}
				</GridList>*/}
          {/* {<Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Post title={sample.title} author={sample.author[0]} picture={sample.picture} text={sample.text} time={sample.time()} id={0} tags={sample.tags} />
            </Carousel.Item>
            <Carousel.Item>
              <Post title={sample.title} author={sample.author[0]} picture={sample.picture} text={sample.text} time={sample.time()} id={0} tags={sample.tags} />
            </Carousel.Item>
            <Carousel.Item>
              <Post title={sample.title} author={sample.author[0]} picture={sample.picture} text={sample.text} time={sample.time()} id={0} tags={sample.tags} />
            </Carousel.Item>
          </Carousel>} */}
          <div>
            <Slide easing="ease">
              <div className="each-slide">
                <Post title={sample.title} author={sample.author[0]} picture={sample.picture} text={sample.text} time={sample.time()} id={0} tags={sample.tags} />
              </div>
              <div className="each-slide">
                <Post title={sample.title} author={sample.author[0]} picture={sample.picture} text={sample.text} time={sample.time()} id={0} tags={sample.tags} />
              </div>
              <div className="each-slide">
                <Post title={sample.title} author={sample.author[0]} picture={sample.picture} text={sample.text} time={sample.time()} id={0} tags={sample.tags} />
              </div>
            </Slide>
          </div>

        </div>
      </div>

    </>
  )
}

export default Main