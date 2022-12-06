import React from "react";

function LoginForm({ loginUser }) {
    return (
        <form className="FormElement" onSubmit={(e) => loginUser(e)}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />

            <div className="ButtonWrapper">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default LoginForm;