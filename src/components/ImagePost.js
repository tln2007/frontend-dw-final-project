import React from "react";

function ImagePost({ ingredients, instructions, servings, title, userName, userId }) {
    return (
        <div className="ImagePost">
            <div className="ImagePostText">
                <h1 className="Title">{title}</h1>
                <p className="Ingredients">{ingredients}</p>
                <p className="Instructions">{instructions}</p>
                <p className="Servings">{servings}</p>
            </div>
        </div>
    );
}

export default ImagePost;