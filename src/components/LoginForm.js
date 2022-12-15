import React from "react";

function LoginForm({ loginUser }) {
    return (
        <form className="FormElement" onSubmit={(e) => loginUser(e)}>
            
            <input type="text" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>

            <div className="buttonWrapper">
                <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default LoginForm;