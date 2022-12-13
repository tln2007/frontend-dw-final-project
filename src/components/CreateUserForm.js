import React from "react";

function CreateUserForm({ signUpUser }) {
    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)}>
            <label htmlFor="displayName">Name</label>
            <input type="text" name="displayName" />

            <label htmlFor="Email">Email</label>
            <input type="text" name="email" />

            <label htmlFor="password">Password</label>
            <input type="text" name="password" />

            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateUserForm;