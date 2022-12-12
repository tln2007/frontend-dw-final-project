import React from "react";
import { Link } from "react-router-dom";

function ImagePost({ caption, imageAlt, imageSrc, userName, userId }) {
    return (
        <div className="ImagePost">
            <img src={imageSrc} alt={imageAlt} />
            <div className="ImagePostText">
                <p className="Caption">{caption}</p>
                <p>
                    Posted by: <Link to={`user/${userId}`}>{userName}</Link>
                </p>
            </div>
        </div>
    );
}

export default ImagePost;