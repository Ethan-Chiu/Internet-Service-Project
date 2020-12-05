import "./App.css";
import React from "react";
import { Button, Input, message, Tag } from "antd";
import axios from 'axios'

//react router
import { HashRouter as Router, Switch, Route} from "react-router-dom";

//page component
import { Home, Login, Main } from "./pages";
import {MainHome, MainSearch, MainPost, MainProfile} from "./pages/main/main_pages";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route exact path = "/main">
					<Main />
				</Route>
					<Route path="/main/home">
						<MainHome/>
					</Route>
					<Route path = "/main/search">
						<MainSearch/>
					</Route>
					<Route path = "/main/post">
						<MainPost/>
					</Route>
					<Route path = "/main/profile">
						<MainProfile/>
					</Route>
				
			</Switch>
		</Router>
	);
}

export default App;
