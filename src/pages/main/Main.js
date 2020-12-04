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


//SPA Navigation 
import MainNav from './Nav'
const hi = <button>hi</button>
const Main = ()=>{
	const { status, opened, messages, sendMessage, clearMessages } = useChat()

	const [username, setUsername] = useState('')
	const [body, setBody] = useState('')

	const bodyRef = useRef(null)

	const displayStatus = (s) => {
		if (s.msg) {
		const { type, msg } = s
		const content = {
			content: msg,
			duration: 0.5
		}

		switch (type) {
			case 'success':
			message.success(content)
			break
			case 'info':
			message.info(content)
			break
			case 'danger':
			default:
			message.error(content)
			break
		}
		}
	}

	useEffect(() => {
		displayStatus(status)
	}, [status])

	return (
		<>
		<div className = 'main'>
			<div className = 'main-left'>
				<MainNav/>
			</div>
			<div>
				<img src = 'map.png' className = 'main-center'></img>
			</div>
			<div className = 'main-right'>
				<GridList cellHeight={90} cols={1} >
				{urls.map((title, index) => (
				<GridListTile key={index} >
					<img src={title} />
					<GridListTileBar title = 'hi' actionIcon = {hi}/>
				</GridListTile>
					))}
				</GridList>
			</div>
		</div>
		</>
	)
}

export default Main