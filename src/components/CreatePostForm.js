//almost identical to login form
import React from "react";

function CreatePostForm({ createPost }) {
    return (
        <form className="FormElement" onSubmit={(e) => createPost(e)}>
            <div className="TitleWrapper">
                <input type="text" name="title" placeholder="Name of Recipe"/>
            </div>
            <div className="IngredientsWrapper">
                <input type="text" name="ingredients" placeholder="Ingredients"/>
            </div>
            <div className="InstructionsWrapper">
                <input type="text" name="instructions" placeholder="Instructions"/>
            </div>
            <div className="ServingsWrapper">
                <input type="text" name="servings" placeholder="Servings"/>
            </div>

            <div className="PostButtonWrapper">
                <button type="submit" className="Button">
                    Post
                </button>
            </div>
        </form>
    );
}

export default CreatePostForm;