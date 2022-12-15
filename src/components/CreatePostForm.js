//almost identical to login form
import React from "react";

function CreatePostForm({ createPost }) {
    return (
        <form className="FormElement" onSubmit={(e) => createPost(e)}>
            <input type="text" name="title" placeholder="Name of Recipe"/>
            <input type="text" name="ingredients" placeholder="Ingredients"/>
            <input type="text" name="instructions" placeholder="Instructions"/>
            <input type="text" name="servings" placeholder="Servings"/>
            

            <div className="PostButtonWrapper">
                <button type="submit" className="Button">
                    Post
                </button>
            </div>
        </form>
    );
}

export default CreatePostForm;