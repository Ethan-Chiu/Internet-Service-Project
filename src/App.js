import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import useChat from "./useChat";
import { Button, Input, message, Tag } from "antd";
import { Login, Main } from "./pages";
import axios from 'axios'

//react router
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path = "/main">
					<Main />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
