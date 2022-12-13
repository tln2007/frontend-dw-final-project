import React from "react";
import { Link } from "react-router-dom";

function ImagePost({ ingredients, instructions, servings, title, userName, userId }) {
    return (
        <div className="ImagePost">
            <div className="ImagePostText">
                <h1 className="Title">{title}</h1>
                <p className="Ingredients">{ingredients}</p>
                <p className="Instructions">{instructions}</p>
                <p className="Servings">{servings}</p>
                <p>
                    Posted by: <Link to={`user/${userId}`}>{userName}</Link>
                </p>
            </div>
        </div>
    );
}

export default ImagePost;