import React, { useEffect, useRef, useState } from "react";
//import { Button, Input, message, Tag } from 'antd'
import GridList from "@material-ui/core/Gridlist";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import urls from "../../images";
import Box from "@material-ui/core/Box";
import "./Main.css";
import { Button, Input, message, Tag } from "antd";
import useChat from "../../useChat";
//map
import GoogleMapReact from "google-map-react";

//SPA Navigation
import MainNav from "./Nav";
import Post from "./Post";
//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const sample = {
	author: "nigg",
	location: "somewhere",
	type: "post",
	title: "title",
	text: "I am poop 2ㄏ2ㄏ",
	picture:
		"https://truth.bahamut.com.tw/s01/201904/2020e6be121356d975aa1a51df35411c.JPG",
	tags: ["#2ㄏ2ㄏ", "乳滑", "shitpost"],
	likes: 0,
	comments: [],
	time: Date.now,
};

const Main = () => {
	const AnyReactComponent = ({ text }) => <div>{text}</div>;
	const { status, opened, messages, sendMessage, clearMessages } = useChat();
	const classes = useStyles();
	const [open0, setOpen0] = React.useState(true);
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);

	const handleClick0 = () => {
		setOpen0(!open0);
		setOpen1(false);
		setOpen2(false);
		setOpen3(false);
	};
	const handleClick1 = () => {
		setOpen1(!open1);
		setOpen0(false);
		setOpen2(false);
		setOpen3(false);
	};
	const handleClick2 = () => {
		setOpen2(!open2);
		setOpen0(false);
		setOpen1(false);
		setOpen3(false);
	};
	const handleClick3 = () => {
		setOpen3(!open3);
		setOpen0(false);
		setOpen2(false);
		setOpen1(false);
	};

	//set theme
	function setTheme(themeName) {
		localStorage.setItem("theme", themeName);
		document.getElementById("theme-controller").className = themeName;
	}

	useEffect(
		// Immediately invoked function to set the theme on initial load
		() => {
			if (localStorage.getItem("theme") === "theme-dark") {
				setTheme("theme-dark");
			} else {
				setTheme("theme-light");
			}
		},[]
	);

	return (
		<div class = "theme-dark" id = "theme-controller">
			<div className="main">
				<div className="main-left">
					<MainNav />
				</div>
				<div className="main-center">
					<div style={{ height: "100vh", width: "100%" }}>
						<GoogleMapReact
							bootstrapURLKeys={{
								key: "AIzaSyBES8rvsfwrOtLZ5S4EvedrOJ4OSIR49UY",
							}}
							defaultCenter={{
								lat: 25.01,
								lng: 121.53,
							}}
							defaultZoom={15}
						>
							<AnyReactComponent
								lat={59.955413}
								lng={30.337844}
								text="My Marker"
							/>
						</GoogleMapReact>
					</div>
				</div>
				<div className="main-right">
					{/*<GridList cellHeight={90} cols={1} >
				{urls.map((title, index) => (
				<GridListTile key={index} >
					<img src={title} />
					<GridListTileBar title = 'hi'/>
				</GridListTile>
					))}
				</GridList>*/}

					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
						className={classes.root}
					>
						<ListItem button onClick={handleClick0}>
							<ListItemIcon>
								<Avatar
									aria-label="recipe"
									className={classes.avatar}
								>
									{sample.author[0]}
								</Avatar>
							</ListItemIcon>
							<ListItemText primary={sample.title} />
							{open0 ? <ExpandLess /> : <ExpandMore />}
						</ListItem>

						<Collapse in={open0} timeout="auto" unmountOnExit>
							<Post
								title={sample.title}
								author={sample.author[0]}
								picture={sample.picture}
								text={sample.text}
								time={sample.time()}
								id={0}
								tags={sample.tags}
							/>
						</Collapse>

						<ListItem button onClick={handleClick1}>
							<ListItemIcon>
								<Avatar
									aria-label="recipe"
									className={classes.avatar}
								>
									{sample.author[0]}
								</Avatar>
							</ListItemIcon>
							<ListItemText primary={sample.title} />
							{open1 ? <ExpandLess /> : <ExpandMore />}
						</ListItem>

						<Collapse in={open1} timeout="auto" unmountOnExit>
							<Post
								title={sample.title}
								author={sample.author[0]}
								picture={sample.picture}
								text={sample.text}
								time={sample.time()}
								id={1}
								tags={sample.tags}
							/>
						</Collapse>

						<ListItem button onClick={handleClick2}>
							<ListItemIcon>
								<Avatar
									aria-label="recipe"
									className={classes.avatar}
								>
									A
								</Avatar>
							</ListItemIcon>
							<ListItemText primary="post-title2" />
							{open2 ? <ExpandLess /> : <ExpandMore />}
						</ListItem>

						<Collapse in={open2} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<Post
									title={sample.title}
									author={sample.author[0]}
									picture={sample.picture}
									text={sample.text}
									time={sample.time()}
									id={2}
									tags={sample.tags}
								/>
							</List>
						</Collapse>

						<ListItem button onClick={handleClick3}>
							<ListItemIcon>
								<Avatar
									aria-label="recipe"
									className={classes.avatar}
								>
									V
								</Avatar>
							</ListItemIcon>
							<ListItemText primary="post-title3" />
							{open3 ? <ExpandLess /> : <ExpandMore />}
						</ListItem>

						<Collapse in={open3} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<Post
									title={sample.title}
									author={sample.author[0]}
									picture={sample.picture}
									text={sample.text}
									time={sample.time()}
									id={3}
									tags={sample.tags}
								/>
							</List>
						</Collapse>

					</List>
				</div>
			</div>
		</div>
	);
};

export default Main;
