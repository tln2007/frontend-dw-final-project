//almost identical to login form
import React from "react";

function CreatePostForm({ createPost }) {
    return (
        <form className="FormElement" onSubmit={(e) => createPost(e)}>
            <label htmlFor="title">Name of Recipe</label>
            <input type="text" name="title" />
            <label htmlFor="imageAlt">Image Alt Text</label>
            <input type="text" name="imageAlt" />
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text" name="ingredients" />
            <label htmlFor="instructions">Instructions</label>
            <input type="text" name="instructions" />
            <label htmlFor="servings">Servings</label>
            <input type="text" name="servings" />
            

            <div className="ButtonWrapper">
                <button type="submit" className="Button">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default CreatePostForm;