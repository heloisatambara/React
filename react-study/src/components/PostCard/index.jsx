import React from "react";
import P from "prop-types";

export const PostCard = ({ post }) => (
    <div className="post">
        <img src={post.cover} alt={post.title} />
        <div className="post-content">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    </div>
);

PostCard.propTypes = {
    post: P.array.isRequired,
};
