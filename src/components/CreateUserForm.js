import React from "react";

function CreateUserForm({ signUpUser }) {
    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)}>
            <input type="text" name="displayName" placeholder="Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="password" placeholder="Password"/>

            <div className="CreateButtonWrapper">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default CreateUserForm;