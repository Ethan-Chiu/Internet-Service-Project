import React, {useState} from 'react'

import MainNav from './../../Nav'

import "./MainSearch.css"

const MainSearch = () =>
{
	const [searchValue, setSearchValue] = useState("")
	const [searchTitle, setSearchTitle] = useState(false)
	const [searchTag, setSearchTag] = useState(false)
	const [searchContent, setSearchContent] = useState(false)
	const search = () => {
	}
	return (
		<>
			<div id = 'theme-controller'>
				<p>MainSearch</p>
				<MainNav/>
			</div>
			<div className="context">
				<form className="searchbar">
					<input placeholder="🔍 Search" onChange={
						(e)=>{setSearchValue(e.target.value)}}/>
					<input type="submit" value="🔍"/>
					<input type="checkbox" name="title" onChange={
						(e)=>{setSearchTitle(e.target.checked)}}/>
					<label htmlFor="title">Title </label>
					<input type="checkbox" name="tag" onChange={
						(e)=>{setSearchTag(e.target.checked)}}/>
					<label htmlFor="tag">Tag </label>
					<input type="checkbox" name="content" onChange={
						(e)=>{setSearchContent(e.target.checked)}}/>
					<label htmlFor="content">Content</label>
				</form>
			</div>
		</>
	);
}

export default MainSearch;
