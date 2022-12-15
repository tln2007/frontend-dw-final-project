import React, { useCallback, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import bakery from "../images/bakery.png";

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
        <div className='LoginPage'>
            <div className='LoginWrapper'>
                <div className='LogoItem'>
                    <img src={bakery} alt="sugarcoded bakery"></img>
                </div>
                <div className='LoginItem'>
                    <h1>Login</h1>
                    <LoginForm loginUser={loginUser}/>
                    <p>{errors}</p>
                    <p><strong>Don't have an account?</strong></p>
                    <p><Link to="/create">Create Account</Link></p>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoginPage;