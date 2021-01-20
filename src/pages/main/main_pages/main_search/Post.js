import React from "react";
import PropTypes from 'prop-types';

const Post = (props) => {
  const { p } = props;
  return (
		<div>
			<p>{ p.title }</p>
		</div>
  );
};


Post.propTypes = {
  p: PropTypes.object
};

export default Post;
