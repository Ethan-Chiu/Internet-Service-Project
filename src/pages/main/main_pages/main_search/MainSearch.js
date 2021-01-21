import React, { useState, useEffect } from 'react'
import { useLazyQuery } from "react-apollo"
import MainNav from './../../Nav'
import { SEARCH_QUERY } from './../../../../graphql'

import "./MainSearch.css"
import Post from './Post'

const MainSearch = () =>
{
	const [searchValue, setSearchValue] = useState("")
	const [searchTitle, setSearchTitle] = useState(false)
	const [searchTag, setSearchTag] = useState(false)
	const [searchContent, setSearchContent] = useState(false)
	const [searchType, setSearchType] = useState(0)
	const [searchPosts, setSearchPosts] = useState([])
	const [getData, { loading, data }] = useLazyQuery(SEARCH_QUERY);
	useEffect(()=>{
		getData({
			variables: {text: searchValue, type: searchType, limit: 9}
		})
		if (data !== undefined) {
			setSearchPosts(data.search.map(mapPosts))
		}
	}, [searchValue, searchType, data])
	const mapPosts = (p) => {
		return <Post p={p} ctheme={localStorage.getItem('theme')}/>
	}

	function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.getElementById("theme-controller").className = themeName;
    }
	useEffect(
        // Immediately invoked function to set the theme on initial load
        () => {
            if (localStorage.getItem('theme') === 'theme-dark') {
                setTheme('theme-dark');
            } else {
                setTheme('theme-light');
            }
        }
    );

	return (
		<>
		
		<div className="theme-dark" id="theme-controller">
				<p>MainSearch</p>
				<MainNav/>
			
		
			<div className="context" >
				<div className="searchbar">
					<input className="searchinput" placeholder="🔍 Search" onChange={
						(e)=>{setSearchValue(e.target.value)}}/>
					<input type="checkbox" name="title" onChange={
						(e)=>{if(e.target.checked){
								setSearchType(searchType%4+4)
							} else {
								setSearchType(searchType%4)}}}/>
					<label htmlFor="title" className="Opt">Title </label>
					<input type="checkbox" name="tag" onChange={
						(e)=>{if(e.target.checked){
								setSearchType(searchType-(searchType%4)+(searchType%2)+2)
							} else {
								setSearchType(searchType-(searchType%4)+(searchType%2))}}}/>
					<label htmlFor="tag" className="Opt">Tag </label>
					<input type="checkbox" name="content" onChange={
						(e)=>{if(e.target.checked){
								setSearchType(searchType-(searchType%2)+1)
							} else {
								setSearchType(searchType-(searchType%2))}}}/>
					<label htmlFor="content" className="Opt">Content</label>
				</div>
			<div style = {{maxHeight: "60vh", overflowY: "scroll"}}>
				<div>
					{	searchPosts }
				</div>
			</div>
		</div>
		</div>
		</>
	);
}

export default MainSearch;
