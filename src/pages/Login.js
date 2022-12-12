import React, { useCallback, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    const loginUser = useCallback((e) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        console.log({ email, password });

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoggedIn(true);
                setUserInformation({
                    email: user.email,
                    displayName: user.displayName,
                    uid: user.uid,
                    accessToken: user.accessToken,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({error, errorCode, errorMessage});
                setErrors(errorMessage);
            })
    }, [setIsLoggedIn, setUserInformation]);

    return (
        <>
            <div className='LoginWrapper'>
                <h1>Login</h1>
                <LoginForm loginUser={loginUser}/>
                <p>{errors}</p>
                <p>Don't have an account?</p>
                <p>
                    <Link to="/create">Create Account</Link>
                </p>
            </div>
        </>
    );
}

export default LoginPage;