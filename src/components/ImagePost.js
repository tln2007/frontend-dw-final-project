import React from "react";
import { Link } from "react-router-dom";

function ImagePost({ imageAlt, imageSrc, ingredients, instructions, servings, title, userName, userId }) {
    return (
        <div className="ImagePost">
            <img src={imageSrc} alt={imageAlt} />
            <div className="ImagePostText">
                <p className="Title">{title}</p>
                <p>
                    Posted by: <Link to={`user/${userId}`}>{userName}</Link>
                </p>
            </div>
        </div>
    );
}

export default ImagePost;