import React from "react";
import PropTypes from 'prop-types';

const Post = (props) => {
  const { p } = props;
  return (
		<div>
			<p>{ p.title }</p>
			<p>{ p.author }</p>
			<p>{ p.text }</p>
			<p>{ p.likes.length }</p>
			<div>{ p.comments.map((c)=>{
				return <p>{c.user} {c.text}</p>
			}) }</div>
		</div>
  );
};


Post.propTypes = {
  p: PropTypes.object
};

export default Post;
